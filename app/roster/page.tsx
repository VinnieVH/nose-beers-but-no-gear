import React from 'react'
import type { Member } from '../lib/types'
import type { WowGuildMember } from '../shared/types'
import RosterTable from '../components/RosterTable'
import { getBaseUrl, getClassNameById, getRaceNameById, getRankName } from '../lib/utils'
import { WowClass, MemberRole } from '../shared/enums'

export default async function Roster(): Promise<React.JSX.Element> {
  let members: Member[]

  try {
    // Fetch from Blizzard roster API
    const baseUrl = getBaseUrl()
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
        race: getRaceNameById(m.character.playable_race.id),
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
      { name: 'Axecleaver', level: 60, class: WowClass.Warrior, race: 'Human', role: MemberRole.Tank, rank: 'Guild Master' },
      { name: 'Lightbringer', level: 60, class: WowClass.Paladin, race: 'Human', role: MemberRole.Healer, rank: 'Raid Leader' },
      { name: 'Firemage', level: 60, class: WowClass.Mage, race: 'Human', role: MemberRole.DPS, rank: 'Officer' },
      { name: 'Shadowpriest', level: 60, class: WowClass.Priest, race: 'Human', role: MemberRole.Healer, rank: 'Member' },
      { name: 'Stealthrogue', level: 60, class: WowClass.Rogue, race: 'Human', role: MemberRole.DPS, rank: 'Member' },
      { name: 'Beerpanda', level: 60, class: WowClass.Monk, race: 'Human', role: MemberRole.Feeder, rank: 'Member' },
      { name: 'Naturedruid', level: 60, class: WowClass.Druid, race: 'Human', role: MemberRole.DPS, rank: 'Member' },
      { name: 'Deathknight', level: 60, class: WowClass.DeathKnight, race: 'Human', role: MemberRole.Tank, rank: 'Member' },
      { name: 'Huntmaster', level: 60, class: WowClass.Hunter, race: 'Human', role: MemberRole.DPS, rank: 'Member' },
      { name: 'Shamanic', level: 60, class: WowClass.Shaman, race: 'Human', role: MemberRole.Healer, rank: 'Member' },
      { name: 'Warlocky', level: 60, class: WowClass.Warlock, race: 'Human', role: MemberRole.DPS, rank: 'Member' }
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