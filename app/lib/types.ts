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
  id: number
  name: string
  level: number
  classID: number
}

export interface OAuthTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

export interface Fight {
  id: number
  name: string
  kill: boolean
  startTime: number
  endTime: number
  encounterID: number
  difficulty: number
  size: number
}

// Transformed data types for the application
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

// =========================
// Raid-helper API Types
// =========================

export interface RaidHelperEvent {
  id: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  channelId: string;
  signUps?: unknown[]; // To be refined if sign-up structure is known
  [key: string]: unknown; // Allow extra fields for forward compatibility
}

export interface RaidHelperEventsResponse {
  pages: number;
  currentPage: number;
  eventCountOverall: number;
  eventCountTransmitted: number;
  postedEvents: RaidHelperEvent[];
} 