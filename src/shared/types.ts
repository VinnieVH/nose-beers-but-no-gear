// ============================================================================
// API & External Service Types
// ============================================================================

export interface OAuthTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface Fight {
  id: number
  name: string
  kill: boolean
  startTime: number
  endTime: number
  encounterID?: number
  difficulty?: number
  size?: number
  standardComposition?: boolean
}

export interface WarcraftLogsGuild {
  id: number
  name: string
  server: {
    name: string
    slug: string
    region: {
      name: string
      slug: string
    }
  }
  faction: {
    name: string
  }
}

export interface WarcraftLogsReport {
  code: string
  title: string
  owner: {
    name: string
  }
  startTime: number
  endTime: number
  zone: {
    id: number
    name: string
  }
  fights: Fight[]
}

export interface WarcraftLogsCharacter {
  name: string
  level: number
  classID: number
  server: {
    name: string
    slug: string
  }
}

export interface GraphQLResponse<T = Record<string, unknown>> {
  data: T
  errors?: Array<{ message: string }>
}

export interface GraphQLVariables {
  [key: string]: string | number | boolean | null | undefined
}

// ============================================================================
// WoW API Types
// ============================================================================

export interface WowRealm {
  id: number
  name: string
  slug: string
  locale: string
  timezone: string
}

export interface WowFaction {
  type: 'HORDE' | 'ALLIANCE'
  name: string
}

export interface WowPlayableClass {
  id: number
  name: string
}

export interface WowPlayableRace {
  id: number
  name: string
}

export interface WowGuild {
  id: number
  name: string
  faction: WowFaction
  achievement_points: number
  member_count: number
  realm: WowRealm
  created_timestamp: number
}

export interface WowGuildMember {
  character: {
    name: string
    id: number
    realm: WowRealm
    level: number
    playable_class: WowPlayableClass
    playable_race: WowPlayableRace
  }
  rank: number
}

export interface WowGuildRoster {
  guild: WowGuild
  members: WowGuildMember[]
}

export interface WowAchievement {
  id: number
  name: string
  description: string
  points: number
  is_account_wide: boolean
  criteria: {
    description: string
    amount: number
  }
  media: {
    id: number
  }
}

export interface WowGuildAchievement {
  achievement: WowAchievement
  completed_timestamp: number
}

export interface WowGuildAchievements {
  guild: WowGuild
  total_quantity: number
  total_points: number
  achievements: WowGuildAchievement[]
  recent_events: WowGuildAchievement[]
}

export interface WowGuildActivityType {
  type: 'ENCOUNTER_VICTORY' | 'PLAYER_ACHIEVEMENT' | 'GUILD_ACHIEVEMENT'
  name: string
}

export interface WowGuildActivity {
  character_achievement?: {
    character: {
      name: string
      id: number
      realm: WowRealm
    }
    achievement: WowAchievement
  }
  guild_achievement?: {
    achievement: WowAchievement
  }
  encounter_completed?: {
    encounter: {
      id: number
      name: string
    }
    mode: {
      type: 'MYTHIC' | 'HEROIC' | 'NORMAL' | 'LFR'
      name: string
    }
  }
  activity: WowGuildActivityType
  timestamp: number
}

export interface WowGuildActivities {
  guild: WowGuild
  activities: WowGuildActivity[]
}

// ============================================================================
// Domain/Business Logic Types
// ============================================================================

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

export interface GuildData {
  guildInfo: GuildInfo
  members: Member[]
  logs: Log[]
}

// ============================================================================
// Theme & Context Types
// ============================================================================

export interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

// ============================================================================
// UI Component Props Types
// ============================================================================

export interface CardProps {
  title?: string
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export interface ErrorDisplayProps {
  error: string
  title?: string
  actionText?: string
  onRetry?: () => void
}

export interface LoadingSpinnerProps {
  message?: string
}

export interface MemberCardProps {
  member: Member
  showRole?: boolean
  className?: string
}

export interface ProgressBarProps {
  label: string
  current: number
  total: number
  percentage?: number
  color?: 'primary' | 'accent' | 'secondary'
}

export interface StatItemProps {
  label: string
  value: string | number
  className?: string
}

export interface TableColumn {
  key: string
  header: string
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
}

export interface TableProps {
  data: Record<string, unknown>[]
  columns: TableColumn[]
  emptyMessage?: string
  className?: string
}

export interface HeroSectionProps {
  title: string
  subtitle: string
  backgroundImage: string
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
}

export interface GuildStatsCardProps {
  guildInfo: GuildInfo | null
  showBeerCount?: boolean
  showLearnMore?: boolean
  className?: string
} 