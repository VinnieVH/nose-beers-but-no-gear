import React from 'react'
import type { Member } from '../lib/types'
import type { WowGuildMember } from '../shared/types'
import RosterTable from '../components/RosterTable'
import { getClassNameById, getRankName } from '../lib/utils'

export default async function Roster(): Promise<React.JSX.Element> {
  let members: Member[]

  try {
    // Fetch from Blizzard roster API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
    const data = await fetch(`${baseUrl}/api/blizzard/roster`, {
      cache: 'no-store'
    })
    
    if (data.ok) {
      const responseData = await data.json()
      // Map Blizzard API response to Member[]
      members = responseData.members.map((m: WowGuildMember) => ({
        name: m.character.name,
        level: m.character.level,
        class: getClassNameById(m.character.playable_class.id),
        rank: getRankName(m.rank),
        role: '' // Not available in Blizzard API
      }))
    } else {
      throw new Error(`API request failed: ${data.status}`)
    }
  } catch (error) {
    console.error('Using fallback data:', error)
    // Use fallback data if API fails
    members = [
      { name: 'Axecleaver', level: 60, class: 'Warrior', role: 'Tank', rank: 'Guild Master' },
      { name: 'Lightbringer', level: 60, class: 'Paladin', role: 'Healer', rank: 'Raid Leader' },
      { name: 'Firemage', level: 60, class: 'Mage', role: 'DPS', rank: 'Officer' },
      { name: 'Shadowpriest', level: 60, class: 'Priest', role: 'Healer', rank: 'Member' },
      { name: 'Stealthrogue', level: 60, class: 'Rogue', role: 'DPS', rank: 'Member' },
      { name: 'Beerpanda', level: 60, class: 'Monk', role: 'Feeder', rank: 'Member' },
      { name: 'Naturedruid', level: 60, class: 'Druid', role: 'DPS', rank: 'Member' },
      { name: 'Deathknight', level: 60, class: 'Death Knight', role: 'Tank', rank: 'Member' },
      { name: 'Huntmaster', level: 60, class: 'Hunter', role: 'DPS', rank: 'Member' },
      { name: 'Shamanic', level: 60, class: 'Shaman', role: 'Healer', rank: 'Member' },
      { name: 'Warlocky', level: 60, class: 'Warlock', role: 'DPS', rank: 'Member' }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-8">
        Guild Roster
      </h1>
      
      <RosterTable members={members} />
    </div>
  )
} 