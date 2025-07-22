import React from 'react'
import Image from 'next/image'
import { formatDate, getPerformanceColor, getBaseUrl } from '../lib/utils'
import { WowClass } from '../shared/enums'
import type { RaidHelperEvent, RaidHelperEventsResponse } from '../lib/types'
import RaidEventCard from '../components/RaidEventCard'

// Hardcoded data to replace hooks
const logs = [
  { raid: 'Mogu\'shan Vaults', date: '2024-01-15T00:00:00.000Z', kills: 6, wipes: 2 },
  { raid: 'Heart of Fear', date: '2024-01-10T00:00:00.000Z', kills: 5, wipes: 3 },
  { raid: 'Terrace of Endless Spring', date: '2024-01-05T00:00:00.000Z', kills: 4, wipes: 1 },
  { raid: 'Throne of Thunder', date: '2024-01-01T00:00:00.000Z', kills: 10, wipes: 5 },
  { raid: 'Siege of Orgrimmar', date: '2023-12-28T00:00:00.000Z', kills: 8, wipes: 7 }
]

const performances = [
  { name: 'Axecleaver', class: WowClass.Warrior, raid: 'Ragnaros', percentage: 99 },
  { name: 'Lightbringer', class: WowClass.Paladin, raid: 'Nefarian', percentage: 97 },
  { name: 'Firemage', class: WowClass.Mage, raid: 'C\'Thun', percentage: 95 },
  { name: 'Shadowpriest', class: WowClass.Priest, raid: 'Ragnaros', percentage: 94 },
  { name: 'Stealthrogue', class: WowClass.Rogue, raid: 'Nefarian', percentage: 93 }
]

const raidProgress = [
  { name: 'Mogu\'shan Vaults', progress: 6, total: 6, percentage: 100, color: 'pandaria-primary' },
  { name: 'Heart of Fear', progress: 5, total: 6, percentage: 83.3, color: 'pandaria-primary' },
  { name: 'Terrace of Endless Spring', progress: 4, total: 4, percentage: 100, color: 'pandaria-accent' },
  { name: 'Throne of Thunder', progress: 10, total: 13, percentage: 76.9, color: 'pandaria-accent' },
  { name: 'Siege of Orgrimmar', progress: 8, total: 14, percentage: 57.1, color: 'pandaria-secondary' }
]

async function getRaidHelperEvents(): Promise<RaidHelperEvent[]> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/raid-helper`, {
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch raid events');
    }
    const data: RaidHelperEventsResponse = await response.json();
    return data.postedEvents || [];
  } catch (error) {
    console.error('Error fetching raid-helper events:', error);
    return [];
  }
}

const Raids = async (): Promise<React.JSX.Element> => {
  const raidEvents = await getRaidHelperEvents();

  // Sort raid events by start time (earliest first)
  const sortedRaidEvents = raidEvents.sort((a, b) => {
    const dateA = new Date(a.startTime).getTime();
    const dateB = new Date(b.startTime).getTime();
    return dateA - dateB;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-8">
        Raid Progression
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Progress Overview */}
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
            Current Progress
          </h2>
          <div className="space-y-6">
            {raidProgress.map((raid, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    {raid.name}
                  </span>
                  <span className={`text-${raid.color} dark:text-${raid.color}Light`}>
                    {raid.progress}/{raid.total}
                  </span>
                </div>
                <div className="w-full bg-pandaria-paper dark:bg-pandaria-dark/50 rounded-full h-2.5">
                  <div
                    className={`bg-${raid.color} dark:bg-${raid.color}Light h-2.5 rounded-full`}
                    style={{
                      width: `${raid.percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Performances */}
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
            Best Performances
          </h2>
          <div className="space-y-4">
            {performances.map((perf, index) => (
              <div key={index} className="flex items-center">
                <Image
                  src={`https://wow.zamimg.com/images/wow/icons/large/classicon_${perf.class.toLowerCase().replace(' ', '')}.jpg`}
                  alt={perf.class}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded border border-pandaria-secondary/50 dark:border-pandaria-accent/50 mr-4"
                />
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    {perf.name}
                  </div>
                  <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                    {perf.class} - {perf.percentage}% {perf.raid}
                  </div>
                </div>
                <div className={`ml-auto font-bold ${getPerformanceColor(perf.percentage)}`}>
                  {perf.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Raid Logs */}
      <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300 mb-8">
        <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
          Recent Raid Logs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-pandaria-paper dark:bg-pandaria-dark/80">
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Raid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Bosses Killed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Wipes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pandaria-primary/10 dark:divide-pandaria-primary/20">
              {logs.map((log, index) => {
                const successRate = ((log.kills / (log.kills + log.wipes)) * 100).toFixed(1)
                return (
                  <tr
                    key={index}
                    className="hover:bg-pandaria-paper dark:hover:bg-pandaria-primary/10 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pandaria-dark dark:text-pandaria-light">
                      {log.raid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
                      {formatDate(log.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
                      {log.kills}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
                      {log.wipes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPerformanceColor(parseFloat(successRate))}`}>
                        {successRate}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raid Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {logs.length}
          </div>
          <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
            Total Raids
          </div>
        </div>
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {logs.reduce((sum, log) => sum + log.kills, 0)}
          </div>
          <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
            Bosses Killed
          </div>
        </div>
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {logs.reduce((sum, log) => sum + log.wipes, 0)}
          </div>
          <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
            Total Wipes
          </div>
        </div>
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {((logs.reduce((sum, log) => sum + log.kills, 0) / (logs.reduce((sum, log) => sum + log.kills + log.wipes, 0))) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
            Success Rate
          </div>
        </div>
      </div>

      {/* Upcoming Raids */}
      <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
        <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
          Upcoming Raids
        </h2>
        {sortedRaidEvents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-lg">
              No upcoming events found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedRaidEvents.map((event) => (
              <RaidEventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Raids 