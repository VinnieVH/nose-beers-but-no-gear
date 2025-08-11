import { getGuildSlug, getRealmSlug } from './../../lib/wowApi';
import { NextResponse } from 'next/server'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '@/app/config/guild'
import { WowAPI } from '@/app/lib/wowApi'

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

    const guildData = await wowApi.fetchAllGuildData()

    return NextResponse.json({
      ...guildData,
      _links: {
        guild: `/api/blizzard/guild?guild=${getGuildSlug(GUILD_NAME)}&realm=${getRealmSlug(GUILD_REALM)}&region=${GUILD_REGION}`,
        roster: `/api/blizzard/roster?guild=${getGuildSlug(GUILD_NAME)}&realm=${getRealmSlug(GUILD_REALM)}&region=${GUILD_REGION}`,
        achievements: `/api/blizzard/achievements?guild=${getGuildSlug(GUILD_NAME)}&realm=${getRealmSlug(GUILD_REALM)}&region=${GUILD_REGION}`,
        activity: `/api/blizzard/activity?guild=${getGuildSlug(GUILD_NAME)}&realm=${getRealmSlug(GUILD_REALM)}&region=${GUILD_REGION}`
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
