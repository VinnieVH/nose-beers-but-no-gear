import { NextResponse } from 'next/server'
import { WowAPI } from '@/app/lib/wowApi'
import type { WowGuildMember } from '@/app/shared/types'
import { getClassNameById, getRaceNameById, getRankName } from '@/app/lib/utils'
import type { Member } from '@/app/lib/types'

export const revalidate = 300

const CONCURRENCY = 5

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

        return {
          name: m.character.name,
          level: m.character.level,
          class: getClassNameById(m.character.playable_class.id),
          race: getRaceNameById(m.character.playable_race.id),
          rank: getRankName(m.rank),
          role: '',
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


