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

    const achievementsData = await wowApi.fetchGuildAchievements()

    if (!achievementsData) {
      return NextResponse.json(
        { error: 'Failed to fetch achievements data' },
        { status: 404 }
      )
    }

    return NextResponse.json(achievementsData)
  } catch (error) {
    console.error('Error fetching achievements data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievements data' },
      { status: 500 }
    )
  }
} 