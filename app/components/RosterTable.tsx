'use client'

import React from 'react'
import { SearchIcon, FilterIcon } from 'lucide-react'
import type { Member } from '../lib/types'
import { MemberRole, WowClass } from '../shared/enums'
import { getClassColor, getClassBadgeColor, getRankPriority, getItemLevelBadgeClasses } from '../lib/utils'
import StatsCard from './StatsCard'
import { useRouter } from 'next/navigation'

interface RosterTableProps {
  members: Member[]
}

const RosterTable = ({ members }: RosterTableProps): React.JSX.Element => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [classFilter, setClassFilter] = React.useState<WowClass | ''>('')
  const [roleFilter, setRoleFilter] = React.useState<MemberRole | ''>('')
  const [sortBy, setSortBy] = React.useState<'level' | 'itemLevel'>('itemLevel')

  // Filter and sort members
  const filteredAndSortedMembers = React.useMemo(() => {
    // First filter members
    const filtered = members.filter((member) => {
      const matchesSearch = member.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesClass = classFilter ? member.class === classFilter : true
      const matchesRole = roleFilter ? member.role === roleFilter : true
      return matchesSearch && matchesClass && matchesRole
    })

    // Then sort by chosen metric (level or average item level) and then by rank priority
    return filtered.sort((a, b) => {
      if (sortBy === 'itemLevel') {
        if (a.averageItemLevel !== b.averageItemLevel) {
          return b.averageItemLevel - a.averageItemLevel
        }
      } else {
        if (a.level !== b.level) {
          return b.level - a.level
        }
      }
      // If levels are equal, sort by rank priority (descending)
      return getRankPriority(b.rank) - getRankPriority(a.rank)
    })
  }, [members, searchTerm, classFilter, roleFilter, sortBy])

  // Get unique classes and roles for filters
  const classes: WowClass[] = React.useMemo(() => [...new Set(members.map((member) => member.class))], [members])
  const roles: MemberRole[] = React.useMemo(() => [...new Set(members.map((member) => member.role))], [members])

  const handleSearchChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value)
  }, [])

  const handleClassFilterChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as WowClass | ''
    setClassFilter(value)
  }, [])

  const handleRoleFilterChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as MemberRole | ''
    setRoleFilter(value)
  }, [])

  const handleSortByChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value as 'level' | 'itemLevel'
    setSortBy(value)
  }, [])

  const classOptions = React.useMemo(() => {
    return classes.map((className, index) => (
      <option key={index} value={className}>
        {className}
      </option>
    ))
  }, [classes])

  const roleOptions = React.useMemo(() => {
    return roles.map((role, index) => (
      <option key={index} value={role}>
        {role}
      </option>
    ))
  }, [roles])

  const handleRowNavigate = React.useCallback((name: string): void => {
    const pathname = `/roster/${name.toLowerCase()}`
    router.push(pathname)
  }, [router])

  const handleRowClick = React.useCallback((event: React.MouseEvent<HTMLTableRowElement>): void => {
    const target = event.currentTarget
    const name = target.dataset.name || ''
    if (!name) return
    handleRowNavigate(name)
  }, [handleRowNavigate])

  const renderMemberRow = React.useCallback((member: Member): React.JSX.Element => (
    <tr
      key={member.name}
      data-name={member.name}
      onClick={handleRowClick}
      tabIndex={0}
      className="hover:bg-pandaria-paper dark:hover:bg-pandaria-primary/10 transition-colors duration-200 cursor-pointer"
      style={{ cursor: 'pointer' }}
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
      <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getItemLevelBadgeClasses(member.averageItemLevel)}`}>
          {member.averageItemLevel}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getClassBadgeColor(member.class)}`}
        >
          {member.class}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
        {member.race}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
        {member.role}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
        {member.rank}
      </td>
    </tr>
  ), [handleRowClick])

  return (
    <>
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
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select
                className="bg-pandaria-paper dark:bg-pandaria-dark/80 text-pandaria-dark dark:text-pandaria-light pl-4 pr-8 py-2 rounded-md border border-pandaria-primary/20 dark:border-pandaria-primary/30 focus:outline-none focus:ring-2 focus:ring-pandaria-primary focus:border-transparent appearance-none"
                value={classFilter}
                onChange={handleClassFilterChange}
              >
                <option value="">All Classes</option>
                {classOptions}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FilterIcon className="h-4 w-4 text-pandaria-dark/50 dark:text-pandaria-light/50" />
              </div>
            </div>
            <div className="relative">
              <select
                className="bg-pandaria-paper dark:bg-pandaria-dark/80 text-pandaria-dark dark:text-pandaria-light pl-4 pr-8 py-2 rounded-md border border-pandaria-primary/20 dark:border-pandaria-primary/30 focus:outline-none focus:ring-2 focus:ring-pandaria-primary focus:border-transparent appearance-none"
                value={roleFilter}
                onChange={handleRoleFilterChange}
              >
                <option value="">All Roles</option>
                {roleOptions}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FilterIcon className="h-4 w-4 text-pandaria-dark/50 dark:text-pandaria-light/50" />
              </div>
            </div>
            <div className="relative">
              <select
                className="bg-pandaria-paper dark:bg-pandaria-dark/80 text-pandaria-dark dark:text-pandaria-light pl-4 pr-8 py-2 rounded-md border border-pandaria-primary/20 dark:border-pandaria-primary/30 focus:outline-none focus:ring-2 focus:ring-pandaria-primary focus:border-transparent appearance-none"
                value={sortBy}
                onChange={handleSortByChange}
              >
                <option value="level">Sort by Level</option>
                <option value="itemLevel">Sort by Avg Item Level</option>
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
                  Avg iLvl
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Race
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
              {filteredAndSortedMembers.map(renderMemberRow)}
            </tbody>
          </table>
        </div>
        {filteredAndSortedMembers.length === 0 && (
          <div className="text-center py-8 text-pandaria-dark/50 dark:text-pandaria-light/50">
            No members found matching your search criteria
          </div>
        )}
      </div>

      {/* Roster Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard value={members.length} label="Total Members" />
        <StatsCard value={members.filter(m => m.role === MemberRole.Tank).length} label="Tanks" />
        <StatsCard value={members.filter(m => m.role === MemberRole.Healer).length} label="Healers" />
        <StatsCard value={members.filter(m => m.role === MemberRole.DPS).length} label="DPS" />
      </div>
    </>
  )
}

export default RosterTable 