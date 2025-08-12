import { NextResponse } from 'next/server'
import { WowAPI } from '@/app/lib/wowApi'
import type { WowGuildMember } from '@/app/shared/types'
import { getClassNameById, getRaceNameById, getRankName, toWowClass } from '@/app/lib/utils'
import type { Member } from '@/app/lib/types'
import { MemberRole } from '@/app/shared/enums'
import { z } from 'zod'

export const revalidate = 300

const CONCURRENCY = 5

const WowGuildMemberSchema = z.object({
  character: z.object({
    name: z.string(),
    level: z.number(),
    playable_class: z.object({ id: z.number() }),
    playable_race: z.object({ id: z.number() }),
  }),
  rank: z.number(),
})

async function enrichWithItemLevel(api: WowAPI, members: WowGuildMember[]): Promise<Member[]> {
  const results: Member[] = []

  for (let i = 0; i < members.length; i += CONCURRENCY) {
    const slice = members.slice(i, i + CONCURRENCY)
    const batch = await Promise.allSettled(
      slice.map(async (m): Promise<Member> => {
        let averageItemLevel = 0
        try {
          const profile = await api.fetchCharacterProfile(m.character.name)
          averageItemLevel = Number(profile?.average_item_level ?? 0)
        } catch {
          averageItemLevel = 0
        }

        // Validate minimally the shape we depend on
        const safe = WowGuildMemberSchema.safeParse(m)
        if (!safe.success) {
          throw new Error('Invalid member payload')
        }

        return {
          name: safe.data.character.name,
          level: safe.data.character.level,
          class: toWowClass(getClassNameById(safe.data.character.playable_class.id)),
          race: getRaceNameById(safe.data.character.playable_race.id),
          rank: getRankName(safe.data.rank),
          role: MemberRole.Member,
          averageItemLevel,
        }
      })
    )

    for (const r of batch) {
      if (r.status === 'fulfilled') results.push(r.value)
    }
  }

  return results
}

export async function GET(): Promise<NextResponse> {
  try {
    const api = new WowAPI()
    const roster = await api.fetchGuildRoster()
    if (!roster) {
      return NextResponse.json({ error: 'Failed to fetch roster data' }, { status: 404 })
    }

    const enriched = await enrichWithItemLevel(api, roster.members)
    return NextResponse.json(enriched)
  } catch {
    return NextResponse.json({ error: 'Failed to build roster with item levels' }, { status: 500 })
  }
}


