import type { 
  WowGuild, 
  WowGuildRoster, 
  WowGuildAchievements, 
  WowGuildActivities,
  OAuthTokenResponse,
  WowItemMedia,
  WowCharacterMedia,
  WowCharacterProfile 
} from '@/app/shared/types'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '../config/guild'
import { getGuildSlug, getRealmSlug } from './utils'

export class WowAPI {
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

  private getNamespace(isStatic: boolean = false): string {
    // Use the exact namespace format from the API documentation
    return isStatic ? `static-classic-${GUILD_REGION.toLowerCase()}` : `profile-classic-${GUILD_REGION.toLowerCase()}`
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
        const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')
        
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

  private async makeGetRequest<T = Record<string, unknown>>(
    endpoint: string, 
    params: Record<string, string> = {},
    namespace: string

  ): Promise<T> {
    const token = await this.getAccessToken()
    const host = this.getRegionHost(GUILD_REGION)
    
    const url = new URL(`${host}${endpoint}`)
    url.searchParams.set('namespace', namespace)
    url.searchParams.set('locale', 'en_GB')
    
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

  async fetchGuild(): Promise<WowGuild | null> {
    try {
      const endpoint = `/data/wow/guild/${getRealmSlug(GUILD_REALM)}/${getGuildSlug(GUILD_NAME)}`
      const data = await this.makeGetRequest<WowGuild>(endpoint, {}, this.getNamespace())
      return data
    } catch (error) {
      console.error('Failed to fetch guild:', error)
      return null
    }
  }

  async fetchGuildRoster(): Promise<WowGuildRoster | null> {
    try {
      const endpoint = `/data/wow/guild/${getRealmSlug(GUILD_REALM)}/${getGuildSlug(GUILD_NAME)}/roster`
      const data = await this.makeGetRequest<WowGuildRoster>(endpoint, {}, this.getNamespace())
      return data
    } catch (error) {
      console.error('Failed to fetch guild roster:', error)
      return null
    }
  }

  async fetchGuildAchievements(): Promise<WowGuildAchievements | null> {
    try {
      const endpoint = `/data/wow/guild/${getRealmSlug(GUILD_REALM)}/${getGuildSlug(GUILD_NAME)}/achievements`
      const data = await this.makeGetRequest<WowGuildAchievements>(endpoint, {}, this.getNamespace())
      return data
    } catch (error) {
      console.error('Failed to fetch guild achievements:', error)
      return null
    }
  }

  async fetchGuildActivity(): Promise<WowGuildActivities | null> {
    try {
      const endpoint = `/data/wow/guild/${getRealmSlug(GUILD_REALM)}/${getGuildSlug(GUILD_NAME)}/activity`
      const data = await this.makeGetRequest<WowGuildActivities>(endpoint, {}, this.getNamespace())
      return data
    } catch (error) {
      console.error('Failed to fetch guild activity:', error)
      return null
    }
  }

  /**
   * Fetches the equipped items for a character
   * @param characterName - The character name (lowercase)
   */
  async fetchCharacterEquipment(characterName: string): Promise<unknown> {
    const endpoint = `/profile/wow/character/${getRealmSlug(GUILD_REALM)}/${characterName.toLowerCase()}/equipment`;
    return this.makeGetRequest(endpoint, {}, this.getNamespace());
  }

  /**
   * Fetches media for an item by itemId
   * @param itemId - The item ID
   */
  async fetchItemMedia(itemId: string): Promise<WowItemMedia> {
    const endpoint = `/data/wow/media/item/${itemId}`;
    return this.makeGetRequest<WowItemMedia>(endpoint, {}, this.getNamespace(true));
  }

  /**
   * Fetches character media and returns the avatar URL if available.
   * @param characterName - The character name (lowercase)
   */
  async fetchCharacterAvatarUrl(characterName: string): Promise<string | null> {
    const endpoint = `/profile/wow/character/${getRealmSlug(GUILD_REALM)}/${characterName.toLowerCase()}/character-media`;
    const media = await this.makeGetRequest<WowCharacterMedia>(endpoint, {}, this.getNamespace());
    const avatar = media?.assets?.find((a) => a.key === 'avatar');
    return avatar?.value ?? null;
  }

  /**
   * Fetches the core character profile
   * @param characterName - The character name (lowercase)
   */
  async fetchCharacterProfile(characterName: string): Promise<WowCharacterProfile> {
    const endpoint = `/profile/wow/character/${getRealmSlug(GUILD_REALM)}/${characterName.toLowerCase()}`
    return this.makeGetRequest<WowCharacterProfile>(endpoint, {}, this.getNamespace())
  }

  /**
   * Fetches media for a guild crest emblem by emblemId
   * @param emblemId - The emblem ID
   */
  async fetchGuildCrestEmblemMedia(emblemId: string): Promise<WowItemMedia> {
    const endpoint = `/data/wow/media/guild-crest/emblem/${emblemId}`
    return this.makeGetRequest<WowItemMedia>(endpoint, {}, this.getNamespace(true))
  }

  /**
   * Fetches media for a guild crest border by borderId
   * @param borderId - The border ID
   */
  async fetchGuildCrestBorderMedia(borderId: string): Promise<WowItemMedia> {
    const endpoint = `/data/wow/media/guild-crest/border/${borderId}`
    return this.makeGetRequest<WowItemMedia>(endpoint, {}, this.getNamespace(true))
  }

  async fetchAllGuildData(): Promise<{
    guild: WowGuild | null
    roster: WowGuildRoster | null
    achievements: WowGuildAchievements | null
    activity: WowGuildActivities | null
  }> {
    try {
      // Fetch all guild data concurrently
      const [guild, roster, achievements, activity] = await Promise.all([
        this.fetchGuild(),
        this.fetchGuildRoster(),
        this.fetchGuildAchievements(),
        this.fetchGuildActivity()
      ])

      return { guild, roster, achievements, activity }
    } catch (error) {
      console.error('Failed to fetch all guild data:', error)
      return { guild: null, roster: null, achievements: null, activity: null }
    }
  }
}
