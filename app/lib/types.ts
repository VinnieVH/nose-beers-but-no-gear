import { WowClass } from "../shared/enums"

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

export interface EquippedItem {
  item: { id: number };
  name: string;
  slot: { type: string; name: string };
  quality: { type: string; name: string };
  media: { id: number };
  enchantments?: Array<{
    display_string: string;
  }>;
  stats?: Array<{
    type: { type: string; name: string };
    value: number;
    display: { display_string: string };
  }>;
}

export interface CharacterEquipmentResponse {
  character: {
    name: string;
    realm: { name: string; slug: string };
  };
  equipped_items: EquippedItem[];
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
  race: string
  rank: string
  role: string
  averageItemLevel: number
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

// Narrow type used for static or summarized raid logs on UI pages
export interface RaidLog {
  raid: string;
  date: string;
  kills: number;
  wipes: number;
}

export interface PerformanceEntry {
  name: string;
  class: WowClass;
  raid: string;
  percentage: number;
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
  imageUrl?: string;
  title?: string;
  leaderName?: string;
  signUpCount?: string | number;
  color?: string;
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

export interface RaidLog {
  raid: string;
  date: string;
  kills: number;
  wipes: number;
}