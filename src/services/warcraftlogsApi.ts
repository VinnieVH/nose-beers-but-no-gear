import type { WarcraftLogsGuild, WarcraftLogsReport, WarcraftLogsCharacter, OAuthTokenResponse, Fight } from './types'

class WarcraftLogsAPI {
  private accessToken: string | null = null
  private tokenExpiration: number = 0
  private readonly baseURL = 'https://classic.warcraftlogs.com'
  private readonly clientId = import.meta.env.VITE_WARCRAFTLOGS_CLIENT_ID
  private readonly clientSecret = import.meta.env.VITE_WARCRAFTLOGS_CLIENT_SECRET

  constructor() {
    if (!this.clientId || !this.clientSecret) {
      console.warn('WarcraftLogs API credentials not found. Please set VITE_WARCRAFTLOGS_CLIENT_ID and VITE_WARCRAFTLOGS_CLIENT_SECRET environment variables.')
    }
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiration) {
      return this.accessToken
    }

    if (!this.clientId || !this.clientSecret) {
      throw new Error('WarcraftLogs API credentials not configured')
    }

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
    }
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

      return data.guildData?.guild || null
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
              fights {
                id
                name
                kill
                startTime
                endTime
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

      return data.reportData?.reports?.data || []
    } catch (error) {
      console.error('Failed to fetch guild reports:', error)
      return []
    }
  }

  async fetchGuildMembers(guildName: string, serverSlug: string, serverRegion: string, limit = 50): Promise<WarcraftLogsCharacter[]> {
    try {
      // First get the guild ID
      const guild = await this.fetchGuild(guildName, serverSlug, serverRegion)
      if (!guild) {
        throw new Error('Guild not found')
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
        guildID: guild.id,
        limit
      })

      return data.characterData?.characters?.data || []
    } catch (error) {
      console.error('Failed to fetch guild members:', error)
      return []
    }
  }
}

// Create a singleton instance
const warcraftLogsAPI = new WarcraftLogsAPI()

// Class ID to class name mapping for WoW classes
const classIdToName: Record<number, string> = {
  1: 'Warrior',
  2: 'Paladin',
  3: 'Hunter',
  4: 'Rogue',
  5: 'Priest',
  6: 'Death Knight',
  7: 'Shaman',
  8: 'Mage',
  9: 'Warlock',
  10: 'Monk',
  11: 'Druid',
  12: 'Demon Hunter',
  13: 'Evoker'
}

// Helper function to convert server name to slug
const getServerSlug = (serverName: string): string => {
  return serverName.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')
}

// Export functions that match the existing API
export const fetchGuildLogs = async (
  guildName = 'Nose Beers But No Gear',
  serverName = 'Pyrewood Village',
  serverRegion = 'eu',
) => {
  try {
    const serverSlug = getServerSlug(serverName)
    const reports = await warcraftLogsAPI.fetchGuildReports(guildName, serverSlug, serverRegion, 20)
    
    return reports
      .filter(report => report.zone) // Only include reports with a zone object
      .map(report => ({
        id: report.code,
        title: report.title,
        owner: report.owner.name,
        start: report.startTime,
        end: report.endTime,
        zone: report.zone.id,
        zoneName: report.zone.name,
      }))
  } catch (error) {
    console.error('Error fetching guild logs:', error)
    // Return fallback data if API fails
    return [
      {
        id: 'fallback1',
        title: 'Recent Raid (API Error)',
        owner: 'Unknown',
        start: Date.now() - 3600000,
        end: Date.now(),
        zone: 1000,
        zoneName: 'Unknown Zone',
      }
    ]
  }
}

export const fetchLogDetails = async (logId: string) => {
  try {
    // Note: For fight details, we would need the specific report code
    // This is a simplified implementation
    const query = `
      query($code: String!) {
        reportData {
          report(code: $code) {
            fights {
              id
              name
              kill
              startTime
              endTime
            }
          }
        }
      }
    `

    const data = await warcraftLogsAPI.makeGraphQLRequest<{ reportData: { report: { fights: Fight[] } } }>(query, { code: logId })
    
    return {
      fights: data.reportData?.report?.fights || [],
      friendlies: [] // Would require additional query
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
  try {
    // This would require more complex GraphQL queries for damage/healing tables
    // For now, return placeholder data
    return {
      totalDamage: 0,
      dps: 0,
      percentile: 0,
    }
  } catch (error) {
    console.error('Error fetching player performance:', error)
    return {
      totalDamage: 0,
      dps: 0,
      percentile: 0,
    }
  }
}

// New function to fetch guild information
export const fetchGuildInfo = async (
  guildName = 'Wipe Inc',
  serverName = 'Pyrewood Village', 
  serverRegion = 'eu'
) => {
  try {
    const serverSlug = getServerSlug(serverName)
    const guild = await warcraftLogsAPI.fetchGuild(guildName, serverSlug, serverRegion)
    
    if (!guild) {
      throw new Error('Guild not found')
    }

    return {
      name: guild.name,
      realm: guild.server.name,
      faction: guild.faction.name,
      created: '2012-09-25T00:00:00Z', // WarcraftLogs doesn't provide creation date
      level: 25, // Guild level not available in API
      memberCount: 0, // Will be updated when fetching members
      description: 'A cheeky guild of mischief-makers focused on having fun while still clearing content.'
    }
  } catch (error) {
    console.error('Error fetching guild info:', error)
    // Return fallback data
    return {
      name: guildName,
      realm: serverName,
      faction: 'Alliance',
      created: '2012-09-25T00:00:00Z',
      level: 25,
      memberCount: 0,
      description: 'Guild information temporarily unavailable.'
    }
  }
}

// New function to fetch guild members
export const fetchGuildMembers = async (
  guildName = 'Nose Beers But No Gear',
  serverName = 'Pyrewood Village',
  serverRegion = 'eu'
) => {
  try {
    const serverSlug = getServerSlug(serverName)
    const characters = await warcraftLogsAPI.fetchGuildMembers(guildName, serverSlug, serverRegion)
    
    return characters.map(character => ({
      name: character.name,
      level: character.level,
      class: classIdToName[character.classID] || 'Unknown',
      rank: 'Member', // WarcraftLogs doesn't provide guild rank
      role: 'DPS' // Would need additional logic to determine role
    }))
  } catch (error) {
    console.error('Error fetching guild members:', error)
    // Return fallback data
    return [
      {
        name: 'API Error',
        level: 1,
        class: 'Unknown',
        rank: 'Member',
        role: 'DPS'
      }
    ]
  }
}
