import { NextResponse } from 'next/server'
import { transformGuildData, getFallbackData } from '../../lib/dataTransformer'
import type { WarcraftLogsGuild, WarcraftLogsReport, WarcraftLogsCharacter, OAuthTokenResponse, Fight } from '../../lib/types'

// Guild configuration
const GUILD_NAME = process.env.GUILD_NAME || 'Nose Beers But No Gear'
const GUILD_REALM = process.env.GUILD_REALM || 'Area 52'
const GUILD_REGION = process.env.GUILD_REGION || 'us'

class WarcraftLogsAPI {
  private accessToken: string | null = null
  private tokenExpiration: number = 0
  private tokenPromise: Promise<string> | null = null
  private readonly baseURL = 'https://classic.warcraftlogs.com'
  private readonly clientId = process.env.WARCRAFTLOGS_CLIENT_ID
  private readonly clientSecret = process.env.WARCRAFTLOGS_CLIENT_SECRET

  constructor() {
    if (!this.clientId || !this.clientSecret) {
      console.warn('WarcraftLogs API credentials not found. Please set WARCRAFTLOGS_CLIENT_ID and WARCRAFTLOGS_CLIENT_SECRET environment variables.')
    }
  }

  private async getAccessToken(): Promise<string> {
    // If we have a valid token, return it
    if (this.accessToken && Date.now() < this.tokenExpiration) {
      return this.accessToken
    }

    // If there's already a token request in progress, wait for it
    if (this.tokenPromise) {
      return this.tokenPromise
    }

    if (!this.clientId || !this.clientSecret) {
      throw new Error('WarcraftLogs API credentials not configured')
    }

    // Create a new token request promise
    this.tokenPromise = (async () => {
      try {
        const credentials = Buffer.from(`${this.clientId!}:${this.clientSecret!}`).toString('base64')
        const response = await fetch(`${this.baseURL}/oauth/token`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=client_credentials'
        })

        if (!response.ok) {
          throw new Error(`OAuth token request failed: ${response.status} ${response.statusText}`)
        }

        const data: OAuthTokenResponse = await response.json()
        this.accessToken = data.access_token
        this.tokenExpiration = Date.now() + (data.expires_in * 1000) - 60000 // Refresh 1 minute early
        
        return this.accessToken!
      } catch (error) {
        console.error('Failed to get WarcraftLogs access token:', error)
        throw error
      } finally {
        // Clear the promise so new requests can be made
        this.tokenPromise = null
      }
    })()

    return this.tokenPromise
  }

  async makeGraphQLRequest<T = Record<string, unknown>>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const token = await this.getAccessToken()
    
    const response = await fetch(`${this.baseURL}/api/v2/client`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: variables || {}
      })
    })

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    
    if (result.errors) {
      throw new Error(`GraphQL errors: ${result.errors.map((e: { message: string }) => e.message).join(', ')}`)
    }

    return result.data
  }

  async fetchGuild(guildName: string, serverSlug: string, serverRegion: string): Promise<WarcraftLogsGuild | null> {
    const query = `
      query($guildName: String!, $serverSlug: String!, $serverRegion: String!) {
        guildData {
          guild(name: $guildName, serverSlug: $serverSlug, serverRegion: $serverRegion) {
            id
            name
            server {
              name
              slug
              region {
                name
                slug
              }
            }
            faction {
              name
            }
          }
        }
      }
    `

    try {
      const data = await this.makeGraphQLRequest<{ guildData: { guild: WarcraftLogsGuild | null } }>(query, {
        guildName,
        serverSlug,
        serverRegion
      })

      const result = data.guildData?.guild || null
      return result
    } catch (error) {
      console.error('Failed to fetch guild:', error)
      return null
    }
  }

  async fetchGuildReports(guildName: string, serverSlug: string, serverRegion: string, limit = 10): Promise<WarcraftLogsReport[]> {
    const query = `
      query($guildName: String!, $serverSlug: String!, $serverRegion: String!, $limit: Int!) {
        reportData {
          reports(
            guildName: $guildName
            guildServerSlug: $serverSlug
            guildServerRegion: $serverRegion
            limit: $limit
          ) {
            data {
              code
              title
              owner {
                name
              }
              startTime
              endTime
              zone {
                id
                name
              }
            }
          }
        }
      }
    `

    try {
      const data = await this.makeGraphQLRequest<{ reportData: { reports: { data: WarcraftLogsReport[] } } }>(query, {
        guildName,
        serverSlug,
        serverRegion,
        limit
      })

      const reports = data.reportData?.reports?.data || []
      
      return reports.map(report => ({
        ...report,
        fights: [] // Will be populated by separate fetchReportFights call if needed
      }))
    } catch (error) {
      console.error('Failed to fetch guild reports:', error)
      return []
    }
  }

  async fetchReportFights(
    reportCode: string, 
    killType?: 'kills' | 'wipes' | 'encounters' | 'trash',
    encounterID?: number,
    difficulty?: number
  ): Promise<Fight[]> {
    let killTypeValue: string | undefined
    
    switch (killType) {
      case 'kills':
        killTypeValue = 'Kills'
        break
      case 'wipes':
        killTypeValue = 'Wipes'
        break
      case 'encounters':
        killTypeValue = 'Encounters'
        break
      case 'trash':
        killTypeValue = 'Trash'
        break
      default:
        killTypeValue = undefined
    }

    const query = `
      query($code: String!, $killType: KillType, $encounterID: Int, $difficulty: Int) {
        reportData {
          report(code: $code) {
            fights(
              killType: $killType
              encounterID: $encounterID
              difficulty: $difficulty
            ) {
              id
              name
              kill
              startTime
              endTime
              encounterID
              difficulty
              size
            }
          }
        }
      }
    `

    try {
      const data = await this.makeGraphQLRequest<{ 
        reportData: { 
          report: { 
            fights: Fight[] 
          } 
        } 
      }>(query, {
        code: reportCode,
        killType: killTypeValue,
        encounterID,
        difficulty
      })

      return data.reportData?.report?.fights || []
    } catch (error) {
      console.error('Failed to fetch report fights:', error)
      return []
    }
  }

  async fetchGuildMembers(guildName: string, serverSlug: string, serverRegion: string, limit = 100): Promise<WarcraftLogsCharacter[]> {
    const query = `
      query($guildName: String!, $serverSlug: String!, $serverRegion: String!, $limit: Int!) {
        guildData {
          guild(name: $guildName, serverSlug: $serverSlug, serverRegion: $serverRegion) {
            members(limit: $limit) {
              data {
                id
                name
                level
                classID
              }
            }
          }
        }
      }
    `

    try {
      const data = await this.makeGraphQLRequest<{ 
        guildData: { 
          guild: { 
            members: { 
              data: WarcraftLogsCharacter[] 
            } 
          } 
        } 
      }>(query, {
        guildName,
        serverSlug,
        serverRegion,
        limit
      })

      return data.guildData?.guild?.members?.data || []
    } catch (error) {
      console.error('Failed to fetch guild members:', error)
      return []
    }
  }
}

// Helper function to convert server name to slug
const getServerSlug = (serverName: string): string => {
  return serverName.toLowerCase().replace(/\s+/g, '-')
}

// Create API instance
const api = new WarcraftLogsAPI()

// Helper function to fetch all guild data
const fetchAllGuildData = async (
  guildName = GUILD_NAME,
  serverName = GUILD_REALM,
  serverRegion = GUILD_REGION,
  includeFights = false
) => {
  const serverSlug = getServerSlug(serverName)
  
  try {
    const [guildInfo, members, reports] = await Promise.all([
      api.fetchGuild(guildName, serverSlug, serverRegion),
      api.fetchGuildMembers(guildName, serverSlug, serverRegion),
      api.fetchGuildReports(guildName, serverSlug, serverRegion)
    ])

    // If includeFights is true, fetch fights for each report
    if (includeFights && reports.length > 0) {
      const reportsWithFights = await Promise.all(
        reports.map(async (report: WarcraftLogsReport) => {
          const fights = await api.fetchReportFights(report.code)
          return { ...report, fights }
        })
      )
      return { guildInfo, members, reports: reportsWithFights }
    }

    return { guildInfo, members, reports }
  } catch (error) {
    console.error('Failed to fetch all guild data:', error)
    throw error
  }
}

export async function GET() {
  try {
    debugger;
    // Fetch all guild data with fights included for kill/wipe calculations
    const { guildInfo: guildRawData, members: charactersData, reports: reportsData } = await fetchAllGuildData(
      process.env.GUILD_NAME || 'Radon',
      process.env.GUILD_REALM || 'Pyrewood Village',
      process.env.GUILD_REGION || 'eu',
      true // includeFights = true to get fight data for kill/wipe calculations
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
    
    // Return fallback data if API fails
    const fallbackData = getFallbackData()
    
    return NextResponse.json(fallbackData)
  }
} 