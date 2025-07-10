import React, { useEffect, useState, createContext, useContext } from 'react'
import type { GuildContextType, GuildInfo, Member, Log } from './types'
import { fetchGuildInfo, fetchGuildMembers, fetchGuildLogs } from '../services/warcraftlogsApi'
const GuildContext = createContext<GuildContextType | null>(null)
export const useGuild = () => {
  const context = useContext(GuildContext)
  if (!context) {
    throw new Error('useGuild must be used within a GuildProvider')
  }
  return context
}
export const GuildProvider = ({ children }: { children: React.ReactNode }) => {
  const [guildInfo, setGuildInfo] = useState<GuildInfo | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const loadGuildData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const guildName = 'Radon'
        const serverName = 'Pyrewood Village'
        const serverRegion = 'eu'

        // Fetch all guild data concurrently
        const [guildInfoData, membersData, logsData] = await Promise.all([
          fetchGuildInfo(guildName, serverName, serverRegion),
          fetchGuildMembers(guildName, serverName, serverRegion),
          fetchGuildLogs(guildName, serverName, serverRegion)
        ])

        // Update guild info with actual member count
        const updatedGuildInfo = {
          ...guildInfoData,
          memberCount: membersData.length
        }

        // Transform logs data to match expected format
        const transformedLogs = logsData.map((log, index) => ({
          id: index + 1,
          raid: log.zoneName,
          date: new Date(log.start).toISOString().split('T')[0],
          kills: 0, // Would need to calculate from fights data
          wipes: 0, // Would need to calculate from fights data
          bestPerformance: 75 + Math.floor(Math.random() * 25) // Placeholder calculation
        }))

        setGuildInfo(updatedGuildInfo)
        setMembers(membersData)
        setLogs(transformedLogs)
      } catch (err) {
        console.error('Failed to load guild data:', err)
        setError(
          'Failed to load guild data from WarcraftLogs. This might be due to missing API credentials or network issues. Using fallback data.',
        )
        
        // Fallback to placeholder data on error
        const fallbackGuildData = {
          name: 'Nose Beers But No Gear',
          realm: 'Pyrewood Village',
          faction: 'Alliance',
          created: '2012-09-25T00:00:00Z',
          level: 25,
          memberCount: 6,
          description:
            'A cheeky guild of mischief-makers focused on having fun while still clearing content. We take our beer seriously, but not much else!',
        }
        
        const fallbackMemberData = [
          {
            name: 'Brewmaster',
            level: 90,
            class: 'Monk',
            rank: 'Guild Master',
            role: 'Tank',
          },
          {
            name: 'MistyWhiskers',
            level: 90,
            class: 'Monk',
            rank: 'Officer',
            role: 'Healer',
          },
          {
            name: 'PawsOfFury',
            level: 90,
            class: 'Monk',
            rank: 'Officer',
            role: 'DPS',
          },
          {
            name: 'NoodleMaster',
            level: 90,
            class: 'Monk',
            rank: 'Chef',
            role: 'Feeder',
          },
          {
            name: 'BambooChewer',
            level: 90,
            class: 'Druid',
            rank: 'Raider',
            role: 'Tank',
          },
          {
            name: 'MistyMist',
            level: 90,
            class: 'Mage',
            rank: 'Raider',
            role: 'DPS',
          },
        ]
        
        const fallbackLogsData = [
          {
            id: 1,
            raid: "Mogu'shan Vaults",
            date: '2023-04-10',
            kills: 6,
            wipes: 2,
            bestPerformance: 95,
          },
          {
            id: 2,
            raid: 'Heart of Fear',
            date: '2023-04-17',
            kills: 5,
            wipes: 4,
            bestPerformance: 88,
          },
          {
            id: 3,
            raid: 'Terrace of Endless Spring',
            date: '2023-04-24',
            kills: 4,
            wipes: 3,
            bestPerformance: 92,
          },
        ]
        
        setGuildInfo(fallbackGuildData)
        setMembers(fallbackMemberData)
        setLogs(fallbackLogsData)
      } finally {
        setLoading(false)
      }
    }

    loadGuildData()
  }, [])
  return (
    <GuildContext.Provider
      value={{
        guildInfo,
        members,
        logs,
        loading,
        error,
      }}
    >
      {children}
    </GuildContext.Provider>
  )
}
