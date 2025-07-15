export interface GuildConfig {
  name: string
  realm: string
  region: string
}

const getGuildConfig = (): GuildConfig => {
  return {
    name: process.env.NEXT_PUBLIC_GUILD_NAME || '',
    realm: process.env.NEXT_PUBLIC_GUILD_REALM || '',
    region: process.env.NEXT_PUBLIC_GUILD_REGION || ''
  }
}

export const guildConfig = getGuildConfig()

// Export individual values for convenience
export const GUILD_NAME = guildConfig.name
export const GUILD_REALM = guildConfig.realm  
export const GUILD_REGION = guildConfig.region