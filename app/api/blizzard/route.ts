import { NextRequest, NextResponse } from 'next/server'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '@/app/config/guild'
import type { 
  WowGuild, 
  WowGuildRoster, 
  WowGuildAchievements, 
  WowGuildActivities,
  OAuthTokenResponse 
} from '@/app/shared/types'

class WowAPI {
  private accessToken: string | null = null
  private tokenExpiration: number = 0
  private tokenPromise: Promise<string> | null = null
  private readonly clientId = process.env.BLIZZARD_API_CLIENT_ID
  private readonly clientSecret = process.env.BLIZZARD_API_CLIENT_SECRET

  constructor() {
    if (!this.clientId || !this.clientSecret) {
      console.warn('Blizzard API credentials not found. Please set BLIZZARD_API_CLIENT_ID and BLIZZARD_API_CLIENT_SECRET environment variables.')
    }
  }

  private getRegionHost(region: string): string {
    switch (region.toLowerCase()) {
      case 'us':
        return 'https://us.api.blizzard.com'
      case 'eu':
        return 'https://eu.api.blizzard.com'
      case 'kr':
        return 'https://kr.api.blizzard.com'
      case 'tw':
        return 'https://tw.api.blizzard.com'
      case 'cn':
        return 'https://gateway.battlenet.com.cn'
      default:
        throw new Error(`Unsupported region: ${region}`)
    }
  }

  private getNamespace(region: string): string {
    // Use the exact namespace format from the API documentation
    return `profile-classic-${region.toLowerCase()}`
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
      throw new Error('Blizzard API credentials not configured')
    }

    // Create a new token request promise
    this.tokenPromise = (async (): Promise<string> => {
      try {
        const credentials = btoa(`${this.clientId}:${this.clientSecret}`)
        
        // Use US region for OAuth (standard for all regions except CN)
        const oauthHost = 'https://oauth.battle.net'
        
        const response = await fetch(`${oauthHost}/token`, {
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
        
        return this.accessToken || ''
      } catch (error) {
        console.error('Failed to get Blizzard access token:', error)
        throw error
      } finally {
        // Clear the promise so new requests can be made
        this.tokenPromise = null
      }
    })()

    return this.tokenPromise
  }

  private async makeRequest<T = Record<string, unknown>>(
    endpoint: string, 
    region: string,
    params: Record<string, string> = {}
  ): Promise<T> {
    const token = await this.getAccessToken()
    const host = this.getRegionHost(region)
    const namespace = this.getNamespace(region)
    
    const url = new URL(`${host}${endpoint}`)
    url.searchParams.set('namespace', namespace)
    url.searchParams.set('locale', 'en_US')
    
    // Add any additional parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`WoW API request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async fetchGuild(realmSlug: string, guildSlug: string, region: string): Promise<WowGuild | null> {
    try {
      const endpoint = `/data/wow/guild/${realmSlug}/${guildSlug}`
      const data = await this.makeRequest<WowGuild>(endpoint, region)
      return data
    } catch (error) {
      console.error('Failed to fetch guild:', error)
      return null
    }
  }

  async fetchGuildRoster(realmSlug: string, guildSlug: string, region: string): Promise<WowGuildRoster | null> {
    try {
      const endpoint = `/data/wow/guild/${realmSlug}/${guildSlug}/roster`
      const data = await this.makeRequest<WowGuildRoster>(endpoint, region)
      return data
    } catch (error) {
      console.error('Failed to fetch guild roster:', error)
      return null
    }
  }

  async fetchGuildAchievements(realmSlug: string, guildSlug: string, region: string): Promise<WowGuildAchievements | null> {
    try {
      const endpoint = `/data/wow/guild/${realmSlug}/${guildSlug}/achievements`
      const data = await this.makeRequest<WowGuildAchievements>(endpoint, region)
      return data
    } catch (error) {
      console.error('Failed to fetch guild achievements:', error)
      return null
    }
  }

  async fetchGuildActivity(realmSlug: string, guildSlug: string, region: string): Promise<WowGuildActivities | null> {
    try {
      const endpoint = `/data/wow/guild/${realmSlug}/${guildSlug}/activity`
      const data = await this.makeRequest<WowGuildActivities>(endpoint, region)
      return data
    } catch (error) {
      console.error('Failed to fetch guild activity:', error)
      return null
    }
  }

  async fetchAllGuildData(realmSlug: string, guildSlug: string, region: string): Promise<{
    guild: WowGuild | null
    roster: WowGuildRoster | null
    achievements: WowGuildAchievements | null
    activity: WowGuildActivities | null
  }> {
    try {
      // Fetch all guild data concurrently
      const [guild, roster, achievements, activity] = await Promise.all([
        this.fetchGuild(realmSlug, guildSlug, region),
        this.fetchGuildRoster(realmSlug, guildSlug, region),
        this.fetchGuildAchievements(realmSlug, guildSlug, region),
        this.fetchGuildActivity(realmSlug, guildSlug, region)
      ])

      return { guild, roster, achievements, activity }
    } catch (error) {
      console.error('Failed to fetch all guild data:', error)
      return { guild: null, roster: null, achievements: null, activity: null }
    }
  }
}

// Helper function to convert guild name to slug format
const getGuildSlug = (guildName: string): string => {
  return guildName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Helper function to convert realm name to slug format
const getRealmSlug = (realmName: string): string => {
  return realmName
    .toLowerCase()
    .replace(/[^a-z0-9\s-']/g, '') // Remove special characters except spaces, hyphens, and apostrophes
    .replace(/['\s]+/g, '-') // Replace apostrophes and spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

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

    const realmSlug = getRealmSlug(realmName)
    const guildSlug = getGuildSlug(guildName)

    const guildData = await wowApi.fetchAllGuildData(realmSlug, guildSlug, region)

    return NextResponse.json(guildData)
  } catch (error) {
    console.error('Error fetching guild data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guild data' },
      { status: 500 }
    )
  }
}
