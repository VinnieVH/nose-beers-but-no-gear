import type { WarcraftLogsGuild, WarcraftLogsReport, WarcraftLogsCharacter, OAuthTokenResponse, Fight } from './types'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '../config/guild'

class WarcraftLogsAPI {
  private accessToken: string | null = null
  private tokenExpiration: number = 0
  private tokenPromise: Promise<string> | null = null
  private readonly baseURL = 'https://classic.warcraftlogs.com'
  private readonly clientId = import.meta.env.VITE_WARCRAFTLOGS_CLIENT_ID
  private readonly clientSecret = import.meta.env.VITE_WARCRAFTLOGS_CLIENT_SECRET

  constructor() {
    if (!this.clientId || !this.clientSecret) {
      console.warn('WarcraftLogs API credentials not found. Please set VITE_WARCRAFTLOGS_CLIENT_ID and VITE_WARCRAFTLOGS_CLIENT_SECRET environment variables.')
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
        const credentials = btoa(`${this.clientId}:${this.clientSecret}`)
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
        
        return this.accessToken
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
    // Updated query structure based on WarcraftLogs API docs
    // Removed fights from the reports query since fights need to be queried separately per report
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
      
      // For each report, we'll need to fetch fights separately if needed
      // For now, return reports without fights to avoid expensive nested queries
      return reports.map(report => ({
        ...report,
        fights: [] // Will be populated by separate fetchReportFights call if needed
      }))
    } catch (error) {
      console.error('Failed to fetch guild reports:', error)
      const fallback: WarcraftLogsReport[] = []
      return fallback
    }
  }

  // New method to fetch fights for a specific report with kill/wipe filtering
  async fetchReportFights(
    reportCode: string, 
    killType?: 'kills' | 'wipes' | 'encounters' | 'trash',
    encounterID?: number,
    difficulty?: number
  ): Promise<Fight[]> {
    let killTypeValue: string | undefined
    
    // Map our simple enum to WarcraftLogs KillType values
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
        killTypeValue = undefined // No filter, get all fights
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

  // New method to fetch reports with their fights (more expensive but complete)
  async fetchGuildReportsWithFights(
    guildName: string, 
    serverSlug: string, 
    serverRegion: string, 
    limit = 10,
    killType?: 'kills' | 'wipes' | 'encounters' | 'trash'
  ): Promise<WarcraftLogsReport[]> {
    // First get the basic reports
    const reports = await this.fetchGuildReports(guildName, serverSlug, serverRegion, limit)
    
    // Then fetch fights for each report
    const reportsWithFights = await Promise.all(
      reports.map(async (report) => {
        const fights = await this.fetchReportFights(report.code, killType)
        return {
          ...report,
          fights
        }
      })
    )
    
    return reportsWithFights
  }

  async fetchGuildMembers(guildName: string, serverSlug: string, serverRegion: string, limit = 100, guildId?: number): Promise<WarcraftLogsCharacter[]> {
    try {
      // Use provided guild ID or fetch it if not provided
      let guildIdToUse = guildId
      if (!guildIdToUse) {
        const guild = await this.fetchGuild(guildName, serverSlug, serverRegion)
        if (!guild) {
          throw new Error('Guild not found')
        }
        guildIdToUse = guild.id
      }

      const query = `
        query($guildID: Int!, $limit: Int!) {
          characterData {
            characters(
              guildID: $guildID
              limit: $limit
            ) {
              data {
                name
                level
                classID
                server {
                  name
                  slug
                }
              }
            }
          }
        }
      `

      const data = await this.makeGraphQLRequest<{ characterData: { characters: { data: WarcraftLogsCharacter[] } } }>(query, {
        guildID: guildIdToUse,
        limit
      })

      const result = data.characterData?.characters?.data || []
      return result
    } catch (error) {
      console.error('Failed to fetch guild members:', error)
      const fallback: WarcraftLogsCharacter[] = []
      return fallback
    }
  }
}

// Create a singleton instance
const warcraftLogsAPI = new WarcraftLogsAPI()

// Helper function to convert server name to slug
const getServerSlug = (serverName: string): string => {
  return serverName.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')
}

// Export simple functions that just call the API without additional caching or transformation
export const fetchGuildInfo = async (
  guildName = GUILD_NAME,
  serverName = GUILD_REALM, 
  serverRegion = GUILD_REGION
) => {
  const serverSlug = getServerSlug(serverName)
  return await warcraftLogsAPI.fetchGuild(guildName, serverSlug, serverRegion)
}

export const fetchGuildMembers = async (
  guildName = GUILD_NAME,
  serverName = GUILD_REALM,
  serverRegion = GUILD_REGION
) => {
  const serverSlug = getServerSlug(serverName)
  return await warcraftLogsAPI.fetchGuildMembers(guildName, serverSlug, serverRegion)
}

export const fetchGuildLogs = async (
  guildName = GUILD_NAME,
  serverName = GUILD_REALM,
  serverRegion = GUILD_REGION,
) => {
  const serverSlug = getServerSlug(serverName)
  return await warcraftLogsAPI.fetchGuildReports(guildName, serverSlug, serverRegion, 20)
}

// New function to fetch reports with fight details and kill/wipe filtering
export const fetchGuildLogsWithFights = async (
  guildName = GUILD_NAME,
  serverName = GUILD_REALM,
  serverRegion = GUILD_REGION,
  killType?: 'kills' | 'wipes' | 'encounters' | 'trash'
) => {
  const serverSlug = getServerSlug(serverName)
  return await warcraftLogsAPI.fetchGuildReportsWithFights(guildName, serverSlug, serverRegion, 20, killType)
}

// New function to fetch fights for a specific report
export const fetchReportFights = async (
  reportCode: string,
  killType?: 'kills' | 'wipes' | 'encounters' | 'trash',
  encounterID?: number,
  difficulty?: number
) => {
  return await warcraftLogsAPI.fetchReportFights(reportCode, killType, encounterID, difficulty)
}

// Helper functions for common use cases
export const fetchGuildKills = async (
  guildName = GUILD_NAME,
  serverName = GUILD_REALM,
  serverRegion = GUILD_REGION
) => {
  return await fetchGuildLogsWithFights(guildName, serverName, serverRegion, 'kills')
}

export const fetchGuildWipes = async (
  guildName = GUILD_NAME,
  serverName = GUILD_REALM,
  serverRegion = GUILD_REGION
) => {
  return await fetchGuildLogsWithFights(guildName, serverName, serverRegion, 'wipes')
}

export const fetchLogDetails = async (
  logId: string,
  killType?: 'kills' | 'wipes' | 'encounters' | 'trash',
  encounterID?: number,
  difficulty?: number
) => {
  try {
    const fights = await warcraftLogsAPI.fetchReportFights(logId, killType, encounterID, difficulty)
    
    return {
      fights,
      friendlies: [] // Would require additional query for participant details
    }
  } catch (error) {
    console.error('Error fetching log details:', error)
    return {
      fights: [],
      friendlies: []
    }
  }
}

export const fetchPlayerPerformance = async (): Promise<{ totalDamage: number; dps: number; percentile: number }> => {
  // This would require more complex GraphQL queries for damage/healing tables
  // For now, return placeholder data
  return {
    totalDamage: 0,
    dps: 0,
    percentile: 0,
  }
}

// Optimized function that fetches all guild data with minimal API calls
export const fetchAllGuildData = async (
  guildName = GUILD_NAME,
  serverName = GUILD_REALM,
  serverRegion = GUILD_REGION,
  includeFights = false,
  killType?: 'kills' | 'wipes' | 'encounters' | 'trash'
) => {
  const serverSlug = getServerSlug(serverName)
  
  // First fetch guild info to get the guild object with ID
  const guildData = await warcraftLogsAPI.fetchGuild(guildName, serverSlug, serverRegion)
  
  if (!guildData) {
    throw new Error('Guild not found')
  }
  
  // Now fetch members and reports concurrently, using the guild ID we already have
  const [charactersData, reportsData] = await Promise.all([
    warcraftLogsAPI.fetchGuildMembers(guildName, serverSlug, serverRegion, 100, guildData.id),
    includeFights 
      ? warcraftLogsAPI.fetchGuildReportsWithFights(guildName, serverSlug, serverRegion, 20, killType)
      : warcraftLogsAPI.fetchGuildReports(guildName, serverSlug, serverRegion, 20)
  ])
  
  return {
    guildInfo: guildData,
    members: charactersData,
    reports: reportsData
  }
}
