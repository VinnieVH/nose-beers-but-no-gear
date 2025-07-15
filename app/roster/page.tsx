'use client'

import React, { useState } from 'react'
import { SearchIcon, FilterIcon } from 'lucide-react'

// Hardcoded data to replace hooks
const members = [
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
  { name: 'Warlocky', level: 60, class: 'Warlock', role: 'DPS', rank: 'Member' },
  { name: 'Demonhunter', level: 60, class: 'Demon Hunter', role: 'DPS', rank: 'Member' },
  { name: 'Evoker', level: 60, class: 'Evoker', role: 'DPS', rank: 'Member' }
]

// Utility functions for class colors
const getClassColor = (className: string): string => {
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

const getClassBadgeColor = (className: string): string => {
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

const Roster = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  // Filter members based on search term and filters
  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesClass = classFilter ? member.class === classFilter : true
    const matchesRole = roleFilter ? member.role === roleFilter : true
    return matchesSearch && matchesClass && matchesRole
  })

  // Get unique classes and roles for filters
  const classes = [...new Set(members.map((member) => member.class))]
  const roles = [...new Set(members.map((member) => member.role))]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-8">
        Guild Roster
      </h1>
      
      {/* Search and Filters */}
      <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 mb-8 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-pandaria-dark/50 dark:text-pandaria-light/50" />
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              className="bg-pandaria-paper dark:bg-pandaria-dark/80 text-pandaria-dark dark:text-pandaria-light w-full pl-10 pr-4 py-2 rounded-md border border-pandaria-primary/20 dark:border-pandaria-primary/30 focus:outline-none focus:ring-2 focus:ring-pandaria-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select
                className="bg-pandaria-paper dark:bg-pandaria-dark/80 text-pandaria-dark dark:text-pandaria-light pl-4 pr-8 py-2 rounded-md border border-pandaria-primary/20 dark:border-pandaria-primary/30 focus:outline-none focus:ring-2 focus:ring-pandaria-primary focus:border-transparent appearance-none"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="">All Classes</option>
                {classes.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FilterIcon className="h-4 w-4 text-pandaria-dark/50 dark:text-pandaria-light/50" />
              </div>
            </div>
            <div className="relative">
              <select
                className="bg-pandaria-paper dark:bg-pandaria-dark/80 text-pandaria-dark dark:text-pandaria-light pl-4 pr-8 py-2 rounded-md border border-pandaria-primary/20 dark:border-pandaria-primary/30 focus:outline-none focus:ring-2 focus:ring-pandaria-primary focus:border-transparent appearance-none"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FilterIcon className="h-4 w-4 text-pandaria-dark/50 dark:text-pandaria-light/50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white dark:bg-pandaria-dark rounded-lg overflow-hidden border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-pandaria-paper dark:bg-pandaria-dark/80">
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pandaria-primary/10 dark:divide-pandaria-primary/20">
              {filteredMembers.map((member, index) => (
                <tr
                  key={index}
                  className="hover:bg-pandaria-paper dark:hover:bg-pandaria-primary/10 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${getClassColor(member.class)}`}
                      ></div>
                      <div className="text-sm font-medium text-pandaria-dark dark:text-pandaria-light">
                        {member.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
                    {member.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getClassBadgeColor(member.class)}`}
                    >
                      {member.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
                    {member.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMembers.length === 0 && (
          <div className="text-center py-8 text-pandaria-dark/50 dark:text-pandaria-light/50">
            No members found matching your search criteria
          </div>
        )}
      </div>

      {/* Roster Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {members.length}
          </div>
          <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
            Total Members
          </div>
        </div>
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {members.filter(m => m.role === 'Tank').length}
          </div>
          <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
            Tanks
          </div>
        </div>
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {members.filter(m => m.role === 'Healer').length}
          </div>
          <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
            Healers
          </div>
        </div>
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {members.filter(m => m.role === 'DPS').length}
          </div>
          <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
            DPS
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roster 