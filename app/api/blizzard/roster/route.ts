import { NextResponse } from 'next/server'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '@/app/config/guild'
import { WowAPI } from '@/app/lib/wowApi'
import { z } from 'zod'

// Create instance
const wowApi = new WowAPI()

export async function GET(): Promise<NextResponse> {
  try {
    if (!GUILD_NAME || !GUILD_REALM || !GUILD_REGION) {
      return NextResponse.json(
        { error: 'Missing required parameters: guild, realm, or region' },
        { status: 400 }
      )
    }

    // Check if API credentials are configured
    if (!process.env.BLIZZARD_API_CLIENT_ID || !process.env.BLIZZARD_API_CLIENT_SECRET) {
      console.error('Blizzard API credentials not configured in environment variables')
      return NextResponse.json(
        { error: 'Blizzard API credentials not configured' },
        { status: 500 }
      )
    }

    const rosterData = await wowApi.fetchGuildRoster()

    if (!rosterData) {
      return NextResponse.json(
        { error: 'Failed to fetch roster data' },
        { status: 404 }
      )
    }

    // Minimal schema validation to prevent downstream surprises
    const MemberSchema = z.object({
      character: z.object({
        name: z.string(),
        level: z.number(),
        playable_class: z.object({ id: z.number() }),
        playable_race: z.object({ id: z.number() }),
      }),
      rank: z.number(),
    })
    const RosterSchema = z.object({ members: z.array(MemberSchema), guild: z.any() })
    const parsed = RosterSchema.safeParse(rosterData)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid roster payload' }, { status: 502 })
    }

    return NextResponse.json(parsed.data)
  } catch (error) {
    console.error('Error fetching roster data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch roster data' },
      { status: 500 }
    )
  }
} 