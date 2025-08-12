import React from 'react'
import type { Member } from '../lib/types'
import RosterTable from '../components/RosterTable'
import { getBaseUrl } from '../lib/utils'
import { WowClass, MemberRole } from '../shared/enums'

export default async function Roster(): Promise<React.JSX.Element> {
  let members: Member[]

  try {
    const baseUrl = getBaseUrl()
    const data = await fetch(`${baseUrl}/api/blizzard/roster-with-ilvl`, { next: { revalidate: 300 } })
    if (data.ok) {
      members = await data.json()
    } else {
      throw new Error(`API request failed: ${data.status}`)
    }
  } catch (error) {
    console.error('Using fallback data:', error)
    // Use fallback data if API fails
    members = [
      { name: 'Axecleaver', level: 60, class: WowClass.Warrior, race: 'Human', role: MemberRole.Tank, rank: 'Guild Master', averageItemLevel: 0 },
      { name: 'Lightbringer', level: 60, class: WowClass.Paladin, race: 'Human', role: MemberRole.Healer, rank: 'Raid Leader', averageItemLevel: 0 },
      { name: 'Firemage', level: 60, class: WowClass.Mage, race: 'Human', role: MemberRole.DPS, rank: 'Officer', averageItemLevel: 0 },
      { name: 'Shadowpriest', level: 60, class: WowClass.Priest, race: 'Human', role: MemberRole.Healer, rank: 'Member', averageItemLevel: 0 },
      { name: 'Stealthrogue', level: 60, class: WowClass.Rogue, race: 'Human', role: MemberRole.DPS, rank: 'Member', averageItemLevel: 0 },
      { name: 'Beerpanda', level: 60, class: WowClass.Monk, race: 'Human', role: MemberRole.Feeder, rank: 'Member', averageItemLevel: 0 },
      { name: 'Naturedruid', level: 60, class: WowClass.Druid, race: 'Human', role: MemberRole.DPS, rank: 'Member', averageItemLevel: 0 },
      { name: 'Deathknight', level: 60, class: WowClass.DeathKnight, race: 'Human', role: MemberRole.Tank, rank: 'Member', averageItemLevel: 0 },
      { name: 'Huntmaster', level: 60, class: WowClass.Hunter, race: 'Human', role: MemberRole.DPS, rank: 'Member', averageItemLevel: 0 },
      { name: 'Shamanic', level: 60, class: WowClass.Shaman, race: 'Human', role: 'Healer', rank: 'Member', averageItemLevel: 0 },
      { name: 'Warlocky', level: 60, class: WowClass.Warlock, race: 'Human', role: 'DPS', rank: 'Member', averageItemLevel: 0 }
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