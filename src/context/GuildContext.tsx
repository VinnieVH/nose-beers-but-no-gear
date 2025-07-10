import React, { useEffect, useState, createContext, useContext } from 'react'
import type { GuildContextType, GuildInfo, Member, Log } from './types'
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
        // For now, use Pandaria-themed placeholder data
        const guildData = {
          name: 'Nose Beers But No Gear',
          realm: 'Pyrewood Village',
          faction: 'Alliance',
          created: '2012-09-25T00:00:00Z',
          level: 25,
          memberCount: 69,
          description:
            'A cheeky guild of mischief-makers focused on having fun while still clearing content. We take our beer seriously, but not much else!',
        }
        const memberData = [
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
        const logsData = [
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
        setGuildInfo(guildData)
        setMembers(memberData)
        setLogs(logsData)
      } catch (err) {
        console.error('Failed to load guild data:', err)
        setError(
          'Failed to load guild data. Please try again later. Maybe the Sha of Anger got to our servers?',
        )
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
