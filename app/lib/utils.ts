import { WowClass } from '../shared/enums'

// Utility functions for class colors
export const getClassColor = (className: string): string => {
  const classColors: Record<string, string> = {
    'Warrior': 'bg-class-warrior',
    'Paladin': 'bg-class-paladin',
    'Hunter': 'bg-class-hunter',
    'Rogue': 'bg-class-rogue',
    'Priest': 'bg-class-priest',
    'Death Knight': 'bg-class-death-knight',
    'Shaman': 'bg-class-shaman',
    'Mage': 'bg-class-mage',
    'Warlock': 'bg-class-warlock',
    'Monk': 'bg-class-monk',
    'Druid': 'bg-class-druid',
    'Demon Hunter': 'bg-class-demon-hunter',
    'Evoker': 'bg-class-evoker'
  }
  return classColors[className] || 'bg-gray-500'
}

export const getClassBadgeColor = (className: string): string => {
  const badgeColors: Record<string, string> = {
    'Warrior': 'bg-class-warrior/20 text-class-warrior border-class-warrior/30',
    'Paladin': 'bg-class-paladin/20 text-class-paladin border-class-paladin/30',
    'Hunter': 'bg-class-hunter/20 text-class-hunter border-class-hunter/30',
    'Rogue': 'bg-class-rogue/20 text-class-rogue border-class-rogue/30',
    'Priest': 'bg-class-priest/20 text-class-priest border-class-priest/30',
    'Death Knight': 'bg-class-death-knight/20 text-class-death-knight border-class-death-knight/30',
    'Shaman': 'bg-class-shaman/20 text-class-shaman border-class-shaman/30',
    'Mage': 'bg-class-mage/20 text-class-mage border-class-mage/30',
    'Warlock': 'bg-class-warlock/20 text-class-warlock border-class-warlock/30',
    'Monk': 'bg-class-monk/20 text-class-monk border-class-monk/30',
    'Druid': 'bg-class-druid/20 text-class-druid border-class-druid/30',
    'Demon Hunter': 'bg-class-demon-hunter/20 text-class-demon-hunter border-class-demon-hunter/30',
    'Evoker': 'bg-class-evoker/20 text-class-evoker border-class-evoker/30'
  }
  return badgeColors[className] || 'bg-gray-500/20 text-gray-500 border-gray-500/30'
}

/**
 * Build a class icon URL from a readable class name using the Zamimg CDN.
 * Example: "Death Knight" -> https://wow.zamimg.com/images/wow/icons/large/classicon_deathknight.jpg
 */
export const getClassIconUrl = (
  className: string,
): string => {
  if (!className) return '';
  const normalized = className.toLowerCase().replace(/\s+/g, '');
  return `https://wow.zamimg.com/images/wow/icons/large/classicon_${normalized}.jpg`;
};

/**
 * Convert a string to a WowClass enum value if valid.
 */
export const toWowClass = (value: string): WowClass => {
  const normalized = value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/(^|\s)\S/g, (s) => s.toUpperCase());

  const map: Record<string, WowClass> = {
    'Warrior': WowClass.Warrior,
    'Paladin': WowClass.Paladin,
    'Hunter': WowClass.Hunter,
    'Rogue': WowClass.Rogue,
    'Priest': WowClass.Priest,
    'Death Knight': WowClass.DeathKnight,
    'Shaman': WowClass.Shaman,
    'Mage': WowClass.Mage,
    'Warlock': WowClass.Warlock,
    'Monk': WowClass.Monk,
    'Druid': WowClass.Druid,
    'Demon Hunter': WowClass.DemonHunter,
    'Evoker': WowClass.Evoker,
  };

  return map[normalized];
};

export function getBaseUrl(): string {
  const vercelUrl = 'nose-beers-but-no-gear.vercel.app'
  // Check for Vercel deployment URL
  if (process.env.NODE_ENV === 'production') {
    // Vercel URL might already include protocol, so handle both cases
    return `https://${vercelUrl}`
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3000'
}

// Rank priority for sorting (higher number = higher priority)
export const getRankPriority = (rank: string): number => {
  const rankPriorities: Record<string, number> = {
    'Guild Master': 4,
    'Officer': 3,
    'Veteran': 2,
    'Member': 1,
    'Initiate': 0
  }
  return rankPriorities[rank] || 0
}

// Map class IDs to class names (WoW Classic Cataclysm)
export const getClassNameById = (classId: number): string => {
  const classMap: Record<number, string> = {
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
    11: 'Druid'
  }
  return classMap[classId] || 'Unknown'
}

export const getRaceNameById = (raceId: number): string => {
  const raceMap: Record<number, string> = {
    1: 'Human',
    2: 'Orc',
    3: 'Dwarf',
    4: 'Night Elf',
    5: 'Undead',
    6: 'Tauren',
    7: 'Gnome',
    8: 'Troll',
    9: 'Goblin',
    10: 'Blood Elf',
    11: 'Draenei',
    12: 'Fel Orc',
    13: 'Naga',
    14: 'Broken',
    15: 'Skeleton',
    16: 'Vrykul',
    17: 'Tuskarr',
    18: 'Forest Troll',
    19: 'Taunka',
    20: 'Northrend Skeleton',
    21: 'Ice Troll',
    22: 'Worgen',
    23: 'Gilnean',
    24: 'Pandaren',
    25: 'Pandaren',
    26: 'Pandaren',
    27: 'Nightborne',
    28: 'Highmountain Tauren',
    29: 'Void Elf',
    30: 'Lightforged Draenei',
    31: 'Zandalari Troll',
    32: 'Kul Tiran',
    33: 'Human',
    34: 'Dark Iron Dwarf',
    35: 'Vulpera',
    36: 'Mag\'har Orc',
    37: 'Mechagnome',
    52: 'Dracthyr',
    70: 'Dracthyr'
  }
  return raceMap[raceId] || 'Unknown'
}

// Map rank numbers to readable rank names
export const getRankName = (rank: number): string => {
  const rankMap: Record<number, string> = {
    0: 'Guild Master',
    1: 'Officer',
    2: 'Veteran',
    3: 'Member',
    4: 'Initiate'
  }
  return rankMap[rank] || 'Member'
} 

/**
 * Format a date string or number to a locale date string.
 * @param date - Date string or timestamp
 * @param locale - Optional locale string (default 'en-US')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string | number, locale: string = 'en-US'): string => {
  if (!date) return '';
  const d = date instanceof Date ? date : (typeof date === 'string' ? new Date(date) : new Date(date));
  return d.toLocaleDateString(locale);
};

/**
 * Format a timestamp (seconds or ms) to a locale date+time string.
 * @param timestamp - Unix timestamp (seconds or ms) or ISO string
 * @param locale - Optional locale string (default 'en-US')
 * @returns Formatted date+time string
 */
export const formatDateTime = (timestamp: Date | number | string, locale: string = 'en-US'): string => {
  if (!timestamp) return '';
  let d: Date;
  if (timestamp instanceof Date) {
    d = timestamp;
  } else if (typeof timestamp === 'number') {
    d = new Date(timestamp > 1e12 ? timestamp : timestamp * 1000);
  } else {
    d = new Date(timestamp);
  }
  return d.toLocaleString(locale, { dateStyle: 'medium', timeStyle: 'short' });
};

/**
 * Get a color class for performance/quality percentage.
 * @param percentage - Performance percentage
 * @returns Tailwind color class
 */
export const getPerformanceColor = (percentage: number): string => {
  if (percentage >= 95) return 'text-quality-epic';
  if (percentage >= 90) return 'text-quality-rare';
  if (percentage >= 80) return 'text-quality-uncommon';
  if (percentage >= 50) return 'text-quality-common';
  return 'text-quality-common';
};

/**
 * Get a CSS color accent for raid event cards.
 * @param color - Optional color string (e.g., '76,175,80')
 * @returns CSS rgba string
 */
export const getColorAccent = (color?: string): string => {
  if (!color) return 'rgba(76,175,80,0.5)';
  return `rgba(${color},0.5)`;
};

/**
 * Get Tailwind classes for an item level badge based on thresholds.
 */
export const getItemLevelBadgeClasses = (itemLevel: number): string => {
  if (!Number.isFinite(itemLevel)) return 'bg-quality-common/15 text-quality-common border-quality-common/30'
  if (itemLevel >= 480) return 'bg-quality-legendary/15 text-quality-legendary border-quality-legendary/30'
  if (itemLevel >= 470) return 'bg-quality-epic/15 text-quality-epic border-quality-epic/30'
  if (itemLevel >= 450) return 'bg-quality-rare/15 text-quality-rare border-quality-rare/30'
  if (itemLevel >= 400) return 'bg-quality-uncommon/15 text-quality-uncommon border-quality-uncommon/30'
  return 'bg-quality-common/15 text-quality-common border-quality-common/30'
}

// Helper function to convert guild name to slug format
export const getGuildSlug = (guildName: string): string => {
  return guildName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Helper function to convert realm name to slug format
export const getRealmSlug = (realmName: string): string => {
  return realmName
    .toLowerCase()
    .replace(/[^a-z0-9\s-']/g, '') // Remove special characters except spaces, hyphens, and apostrophes
    .replace(/['\s]+/g, '-') // Replace apostrophes and spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}
