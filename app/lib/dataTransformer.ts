import type { WarcraftLogsGuild, WarcraftLogsReport, WarcraftLogsCharacter, GuildInfo, Member, Log } from './types'

// Class ID to class name mapping for WoW classes
const classIdToName: Record<number, string> = {
  1: 'Death Knight',
  2: 'Druid',
  3: 'Hunter',
  4: 'Mage',
  5: 'Monk',
  6: 'Paladin',
  7: 'Priest',
  8: 'Rogue',
  9: 'Shaman',
  10: 'Warlock',
  11: 'Warrior',
  12: 'Demon Hunter',
  13: 'Evoker'
}

export const transformGuildData = (
  guildRawData: WarcraftLogsGuild | null,
  charactersData: WarcraftLogsCharacter[],
  reportsData: WarcraftLogsReport[]
): { guildInfo: GuildInfo; members: Member[]; logs: Log[] } => {
  // Transform guild info data
  const guildInfo: GuildInfo = guildRawData ? {
    name: guildRawData.name,
    realm: guildRawData.server.name,
    faction: guildRawData.faction.name,
    created: '2012-09-25T00:00:00Z', // WarcraftLogs doesn't provide creation date
    level: 25, // Guild level not available in API
    memberCount: charactersData.length,
    description: 'A cheeky guild of mischief-makers focused on having fun while still clearing content.'
  } : {
    name: 'Nose Beers But No Gear',
    realm: 'Area 52',
    faction: 'Alliance',
    created: '2012-09-25T00:00:00Z',
    level: 25,
    memberCount: charactersData.length,
    description: 'A cheeky guild of mischief-makers focused on having fun while still clearing content.'
  }

  // Transform members data
  const members: Member[] = charactersData.map((character: WarcraftLogsCharacter) => ({
    name: character.name,
    level: character.level,
    class: classIdToName[character.classID] || 'Unknown',
    rank: 'Member', // Default rank since WarcraftLogs API doesn't provide rank
    role: 'DPS' // Would need additional logic to determine role
  }))

  // Transform logs data
  const logs: Log[] = reportsData
    .filter((report: WarcraftLogsReport) => report.zone) // Only include reports with a zone object
    .map((report: WarcraftLogsReport, index: number) => {
      // Only count boss fights (kill !== null), ignore trash packs (kill === null)
      const kills = report.fights.filter((fight) => fight.kill === true).length
      const wipes = report.fights.filter((fight) => fight.kill === false).length
      
      return {
        id: index + 1,
        raid: report.zone.name,
        date: new Date(report.startTime).toISOString().split('T')[0],
        kills,
        wipes,
        bestPerformance: 75 + Math.floor(Math.random() * 25) // Placeholder calculation
      }
    })

  return {
    guildInfo,
    members,
    logs
  }
}

export const getFallbackData = (): { guildInfo: GuildInfo; members: Member[]; logs: Log[] } => {
  return {
    guildInfo: {
      name: 'Nose Beers But No Gear',
      realm: 'Area 52',
      faction: 'Alliance',
      created: '2012-09-25T00:00:00Z',
      level: 25,
      memberCount: 6,
      description: 'A cheeky guild of mischief-makers focused on having fun while still clearing content. We take our beer seriously, but not much else!'
    },
    members: [
      { name: 'Brewmaster', level: 90, class: 'Monk', rank: 'Guild Master', role: 'Tank' },
      { name: 'MistyWhiskers', level: 90, class: 'Monk', rank: 'Officer', role: 'Healer' },
      { name: 'PawsOfFury', level: 90, class: 'Monk', rank: 'Officer', role: 'DPS' },
      { name: 'NoodleMaster', level: 90, class: 'Monk', rank: 'Chef', role: 'Feeder' },
      { name: 'BambooChewer', level: 90, class: 'Druid', rank: 'Raider', role: 'Tank' },
      { name: 'MistyMist', level: 90, class: 'Mage', rank: 'Raider', role: 'DPS' }
    ],
    logs: [
      { id: 1, raid: "Mogu'shan Vaults", date: '2023-04-10', kills: 6, wipes: 2, bestPerformance: 95 },
      { id: 2, raid: 'Heart of Fear', date: '2023-04-17', kills: 5, wipes: 4, bestPerformance: 88 },
      { id: 3, raid: 'Terrace of Endless Spring', date: '2023-04-24', kills: 4, wipes: 3, bestPerformance: 92 }
    ]
  }
} 