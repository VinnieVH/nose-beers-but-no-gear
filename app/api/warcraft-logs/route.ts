import { NextResponse } from 'next/server'
import { transformGuildData } from '../../lib/dataTransformer'
import { fetchAllGuildData } from '../../lib/warcraftlogsApi'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '@/app/config/guild'

export async function GET(): Promise<NextResponse> {
  try {
    
    // Fetch all guild data with fights included for kill/wipe calculations
    const { guildInfo: guildRawData, members: charactersData, reports: reportsData } = await fetchAllGuildData(
      GUILD_NAME,
      GUILD_REALM,
      GUILD_REGION,
      true
    )

    // Transform the raw API data into the format expected by the components
    const { guildInfo, members, logs } = transformGuildData(guildRawData, charactersData, reportsData)

    return NextResponse.json({
      guildInfo,
      members,
      logs
    })
  } catch (error) {
    console.error('Failed to fetch guild data:', error)
    
    
    return NextResponse.json(fallbackData)
  }
} 