import { useGetGuildDataQuery } from '../store/warcraftLogsApi'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '../config/guild'

export const useGuildData = () => {
  const {
    data,
    isLoading,
    isError,
  } = useGetGuildDataQuery({
    guildName: GUILD_NAME,
    serverName: GUILD_REALM,
    serverRegion: GUILD_REGION
  })

  return {
    guildInfo: data?.guildInfo || null,
    members: data?.members || [],
    logs: data?.logs || [],
    loading: isLoading,
    error: isError ? 'Failed to load guild data' : null,
  }
} 