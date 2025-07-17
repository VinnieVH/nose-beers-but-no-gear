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

export function getBaseUrl(): string {
  // Check for Vercel deployment URL
  if (process.env.VERCEL_URL) {
    // Vercel URL might already include protocol, so handle both cases
    const vercelUrl = process.env.VERCEL_URL
    if (vercelUrl.startsWith('http')) {
      return vercelUrl
    }
    return `https://${vercelUrl}`
  }
  
  // Check for custom domain in production
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3001'
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