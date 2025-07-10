export interface GuildInfo {
  name: string
  realm: string
  faction: string
  created: string
  level: number
  memberCount: number
  description: string
}

export interface Member {
  name: string
  level: number
  class: string
  rank: string
  role: string
}

export interface Log {
  id: number
  raid: string
  date: string
  kills: number
  wipes: number
  bestPerformance: number
}

export interface GuildContextType {
  guildInfo: GuildInfo | null
  members: Member[]
  logs: Log[]
  loading: boolean
  error: string | null
}
