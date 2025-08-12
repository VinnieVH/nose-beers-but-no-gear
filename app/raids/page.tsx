import React from 'react'
import Image from 'next/image'
import { formatDate, getPerformanceColor, getBaseUrl } from '../lib/utils'
import type { RaidHelperEvent, RaidHelperEventsResponse } from '../lib/types'
import RaidEventCard from '../components/RaidEventCard'
import type { RaidLog, PerformanceEntry } from '@/app/lib/types';

const logs: RaidLog[] = [
  // { raid: 'Mogu\'shan Vaults', date: '2024-01-15T00:00:00.000Z', kills: 6, wipes: 2 },
  // { raid: 'Heart of Fear', date: '2024-01-10T00:00:00.000Z', kills: 5, wipes: 3 },
  // { raid: 'Terrace of Endless Spring', date: '2024-01-05T00:00:00.000Z', kills: 4, wipes: 1 },
  // { raid: 'Throne of Thunder', date: '2024-01-01T00:00:00.000Z', kills: 10, wipes: 5 },
  // { raid: 'Siege of Orgrimmar', date: '2023-12-28T00:00:00.000Z', kills: 8, wipes: 7 }
]

const performances: PerformanceEntry[] = [
  // { name: 'Axecleaver', class: WowClass.Warrior, raid: 'Ragnaros', percentage: 99 },
  // { name: 'Lightbringer', class: WowClass.Paladin, raid: 'Nefarian', percentage: 97 },
  // { name: 'Firemage', class: WowClass.Mage, raid: 'C\'Thun', percentage: 95 },
  // { name: 'Shadowpriest', class: WowClass.Priest, raid: 'Ragnaros', percentage: 94 },
  // { name: 'Stealthrogue', class: WowClass.Rogue, raid: 'Nefarian', percentage: 93 }
]

const raidProgress = [
  { name: 'Mogu\'shan Vaults', progress: 2, total: 6, percentage: 100, color: 'pandaria-primary', heroic: true },
  { name: 'Heart of Fear', progress: 0, total: 6, percentage: 0, color: 'pandaria-primary', heroic: false },
  { name: 'Terrace of Endless Spring', progress: 0, total: 4, percentage: 0, color: 'pandaria-accent', heroic: false },
  { name: 'Throne of Thunder', progress: 0, total: 13, percentage: 0, color: 'pandaria-accent', heroic: false },
  { name: 'Siege of Orgrimmar', progress: 0, total: 14, percentage: 0, color: 'pandaria-secondary', heroic: false }
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
                    {raid.progress}/{raid.total} {raid.heroic ? '(Heroic)' : ''}
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
            {performances.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-pandaria-paper dark:bg-pandaria-dark/60 border border-pandaria-primary/20 dark:border-pandaria-primary/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-pandaria-secondary dark:text-pandaria-accent"
                    aria-hidden="true"
                  >
                    <path d="M6.672 3.278A.75.75 0 0 1 7.392 3h9.216a.75.75 0 0 1 .72.528l.972 3.237a3.751 3.751 0 0 1-2.513 4.684 5.251 5.251 0 0 1-2.47 4.245 3.75 3.75 0 1 1-6.561 0A5.251 5.251 0 0 1 5.213 11.45 3.751 3.751 0 0 1 2.7 6.765l.972-3.237ZM12 20.25a2.25 2.25 0 0 0 2.25-2.25h-4.5A2.25 2.25 0 0 0 12 20.25Zm6.75-13.5.71-2.367a.75.75 0 0 1 .72-.533h1.02a.75.75 0 0 1 0 1.5h-.447l-.557 1.857a2.252 2.252 0 0 1-.068 4.46 6.79 6.79 0 0 0-.853-1.39 3.75 3.75 0 0 0 .525-3.527Z" />
                  </svg>
                </div>
                <p className="text-pandaria-dark/80 dark:text-pandaria-light/90 font-medium">
                  No performances yet
                </p>
                <p className="mt-1 text-sm text-pandaria-dark/70 dark:text-pandaria-light/70 max-w-md">
                  Once our team starts uploading logs, top parses and best performances will appear here.
                </p>
              </div>
            ) : (
              performances.map((perf, index) => (
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
              ))
            )}
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
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-pandaria-paper dark:bg-pandaria-dark/60 border border-pandaria-primary/20 dark:border-pandaria-primary/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6 text-pandaria-secondary dark:text-pandaria-accent"
                          aria-hidden="true"
                        >
                          <path d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Zm2.25-.75a.75.75 0 0 0-.75.75v.443l7.5 4.286 7.5-4.286V6.75a.75.75 0 0 0-.75-.75H5.25Zm14.25 3.195-7.162 4.096a.75.75 0 0 1-.776 0L4.5 9.195v8.055c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V9.195Z" />
                        </svg>
                      </div>
                      <p className="text-pandaria-dark/80 dark:text-pandaria-light/90 font-medium">
                        No raid logs yet
                      </p>
                      <p className="mt-1 text-sm text-pandaria-dark/70 dark:text-pandaria-light/70 max-w-md">
                        Once our team starts uploading logs, they will appear here with kill/wipe stats and success rates.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => {
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

{logs.length > 0 && (
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
      )}
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