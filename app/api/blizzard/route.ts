import { NextRequest, NextResponse } from 'next/server'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '@/app/config/guild'
import { WowAPI } from '@/app/lib/wowApi'

// Create instance
const wowApi = new WowAPI()

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const guildName = searchParams.get('guild') || GUILD_NAME
    const realmName = searchParams.get('realm') || GUILD_REALM
    const region = searchParams.get('region') || GUILD_REGION

    if (!guildName || !realmName || !region) {
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

    const guildData = await wowApi.fetchAllGuildData()

    return NextResponse.json({
      ...guildData,
      _links: {
        guild: `/api/blizzard/guild?guild=${guildName}&realm=${realmName}&region=${region}`,
        roster: `/api/blizzard/roster?guild=${guildName}&realm=${realmName}&region=${region}`,
        achievements: `/api/blizzard/achievements?guild=${guildName}&realm=${realmName}&region=${region}`,
        activity: `/api/blizzard/activity?guild=${guildName}&realm=${realmName}&region=${region}`
      }
    })
  } catch (error) {
    console.error('Error fetching guild data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guild data' },
      { status: 500 }
    )
  }
}
