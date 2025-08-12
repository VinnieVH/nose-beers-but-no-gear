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
  kill: boolean | null  // true = boss kill, false = boss wipe, null = trash pack
  startTime: number
  endTime: number
  encounterID?: number
  difficulty?: number
  size?: number
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

export interface WowLinks {
  self: {
    href: string
  }
}

export interface WowKey {
  href: string
}

export interface WowRealm {
  key: WowKey
  name: string
  id: number
  slug: string
}

export interface WowRealmLocalized {
  key: WowKey
  name: {
    en_US: string
    es_MX: string
    pt_BR: string
    de_DE: string
    en_GB: string
    es_ES: string
    fr_FR: string
    it_IT: string
    ru_RU: string
    ko_KR: string
    zh_TW: string
    zh_CN: string
  }
  id: number
  slug: string
}

export interface WowFaction {
  type: 'HORDE' | 'ALLIANCE'
  name: string
}

export interface WowFactionLocalized {
  type: 'HORDE' | 'ALLIANCE'
  name: {
    en_US: string
    es_MX: string
    pt_BR: string
    de_DE: string
    en_GB: string
    es_ES: string
    fr_FR: string
    it_IT: string
    ru_RU: string
    ko_KR: string
    zh_TW: string
    zh_CN: string
  }
}

export interface WowPlayableClass {
  key: WowKey
  id: number
}

export interface WowPlayableRace {
  key: WowKey
  id: number
}

export interface WowCrestColor {
  id: number
  rgba: {
    r: number
    g: number
    b: number
    a: number
  }
}

export interface WowCrestMedia {
  key: WowKey
  id: number
}

export interface WowCrestEmblem {
  id: number
  media: WowCrestMedia
  color: WowCrestColor
}

export interface WowCrestBorder {
  id: number
  media: WowCrestMedia
  color: WowCrestColor
}

export interface WowCrestBackground {
  color: WowCrestColor
}

export interface WowCrest {
  emblem: WowCrestEmblem
  border: WowCrestBorder
  background: WowCrestBackground
}

export interface WowGuildLinks {
  roster: {
    href: string
  }
  achievements: {
    href: string
  }
  activity: {
    href: string
  }
}

export interface WowGuild {
  id: number
  name: string
  faction: WowFaction
  achievement_points: number
  member_count: number
  realm: WowRealm
  crest: WowCrest
  created_timestamp: number
  name_search: string
}

export interface WowGuildReference {
  key: WowKey
  name: string
  id: number
  realm: WowRealm
  faction: WowFaction
}

export interface WowGuildReferenceLocalized {
  key: WowKey
  name: string
  id: number
  realm: WowRealmLocalized
  faction: WowFactionLocalized
}

export interface WowCharacter {
  key: WowKey
  name: string
  id: number
  realm: WowRealm
  level: number
  playable_class: WowPlayableClass
  playable_race: WowPlayableRace
  faction: {
    type: 'HORDE' | 'ALLIANCE'
  }
}

export interface WowGuildMember {
  character: WowCharacter
  rank: number
}

export interface WowGuildRoster {
  guild: WowGuildReference
  members: WowGuildMember[]
}

export interface WowAchievement {
  key: WowKey
  name: string
  id: number
}

export interface WowAchievementLocalized {
  key: WowKey
  name: {
    en_US: string
    es_MX: string
    pt_BR: string
    de_DE: string
    en_GB: string
    es_ES: string
    fr_FR: string
    it_IT: string
    ru_RU: string
    ko_KR: string
    zh_TW: string
    zh_CN: string
  }
  id: number
}

export interface WowAchievementCriteria {
  id: number
  is_completed: boolean
  child_criteria?: WowAchievementCriteria[]
  amount?: number
}

export interface WowGuildAchievement {
  id: number
  achievement: WowAchievement
  criteria: WowAchievementCriteria
  completed_timestamp?: number
}

export interface WowGuildAchievements {
  guild: WowGuildReference
  total_quantity: number
  total_points: number
  achievements: WowGuildAchievement[]
  category_progress: Array<{
    category: {
      key: WowKey
      name: string
      id: number
    }
    quantity: number
    points: number
  }>
  recent_events: Array<{
    achievement: WowAchievement
    timestamp: number
  }>
}

export interface WowGuildActivityType {
  type: 'CHARACTER_ACHIEVEMENT' | 'GUILD_ACHIEVEMENT' | 'ENCOUNTER_VICTORY'
}

export interface WowCharacterAchievement {
  character: {
    key: WowKey
    name: string
    id: number
    realm: WowRealmLocalized
  }
  achievement: WowAchievement
}

export interface WowGuildActivity {
  character_achievement?: WowCharacterAchievement
  guild_achievement?: {
    achievement: WowGuildAchievement
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
  guild: WowGuildReferenceLocalized
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

// Blizzard WoW Item Media API response type
export interface WowItemMedia {
  _links: { self: { href: string } };
  id: number;
  assets: Array<{
    key: string;
    value: string;
  }>;
}

// Character media response (avatar and related assets)
export interface WowCharacterMedia {
  _links: { self: { href: string } };
  character: {
    key: WowKey;
    name: string;
    id: number;
    realm: WowRealm;
  };
  assets: Array<{
    key: string; // e.g., 'avatar'
    value: string; // URL
  }>;
}

// Character profile (core character endpoint)
export interface WowHref {
  href: string
}

export interface WowCharacterProfile {
  _links: WowLinks
  id: number
  name: string
  gender: {
    type: 'MALE' | 'FEMALE'
    name: string
  }
  faction: WowFaction
  race: {
    key: WowKey
    name: string
    id: number
  }
  character_class: {
    key: WowKey
    name: string
    id: number
  }
  active_spec: {
    key: WowKey
    name: string
    id: number
  }
  realm: WowRealm
  guild?: WowGuildReference
  level: number
  experience: number
  achievement_points: number
  achievements: WowHref
  titles: WowHref
  pvp_summary: WowHref
  media: WowHref
  last_login_timestamp: number
  average_item_level: number
  equipped_item_level: number
  specializations: WowHref
  statistics: WowHref
  equipment: WowHref
  appearance: WowHref
  active_title?: {
    name: string
  }
}

 