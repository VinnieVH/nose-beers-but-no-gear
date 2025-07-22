import React from 'react'
import Image from 'next/image'
import { CalendarIcon, UsersIcon, InfoIcon, StarIcon, ActivityIcon } from 'lucide-react'
import type { WowGuild, WowGuildRoster, WowGuildAchievements, WowGuildActivities } from '@/app/shared/types'
import { GUILD_NAME, GUILD_REALM, GUILD_REGION } from '@/app/config/guild'
import { getBaseUrl, formatDate } from '../lib/utils'
import type { RaidHelperEvent, RaidHelperEventsResponse } from '../lib/types';
import RaidEventCard from '../components/RaidEventCard';

interface GuildData {
  guild: WowGuild | null
  roster: WowGuildRoster | null
  achievements: WowGuildAchievements | null
  activity: WowGuildActivities | null
}

async function getGuildData(): Promise<GuildData> {
  try {
    const params = new URLSearchParams({
      guild: GUILD_NAME,
      realm: GUILD_REALM,
      region: GUILD_REGION
    })

    // Use absolute URL for server-side requests
    const baseUrl = getBaseUrl()
    
    const response = await fetch(`${baseUrl}/api/blizzard?${params.toString()}`, {
      next: { revalidate: 3600 } // cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch guild data: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching guild data:', error)
    // Return fallback data if API fails
    return {
      guild: null,
      roster: null,
      achievements: null,
      activity: null
    }
  }
}

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
    console.log(data);
    return data.postedEvents || [];
  } catch (error) {
    console.error('Error fetching raid-helper events:', error);
    return [];
  }
}

const About = async (): Promise<React.JSX.Element> => {
  const { guild, roster, achievements, activity } = await getGuildData();
  const raidEvents = await getRaidHelperEvents();

  // Sort raid events by start time (earliest first)
  const sortedRaidEvents = raidEvents.sort((a, b) => {
    const dateA = new Date(a.startTime).getTime();
    const dateB = new Date(b.startTime).getTime();
    return dateA - dateB;
  });

  // Format guild info with fallbacks
  const guildInfo = {
    realm: guild?.realm?.name || GUILD_REALM,
    faction: guild?.faction?.name || 'Alliance',
    memberCount: guild?.member_count || roster?.members?.length || 0,
    created: guild?.created_timestamp ? new Date(guild.created_timestamp).toISOString() : '2023-01-15T00:00:00.000Z',
    name: guild?.name || GUILD_NAME
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-8">
        About Our Guild
      </h1>

      {/* Guild Banner */}
      <div className="relative rounded-lg overflow-hidden h-64 mb-12">
        <Image
          src="https://assetsio.gnwcdn.com/pandaria-character.jpg?width=1920&height=1920&fit=bounds&quality=70&format=jpg&auto=webp"
          alt="Guild Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pandaria-dark to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex items-center">
            <Image
              src="https://wow.zamimg.com/images/wow/icons/large/ui_allianceicon-round.jpg"
              alt="Guild Logo"
              width={64}
              height={64}
              className="w-16 h-16 rounded border-2 border-pandaria-accent mr-4"
            />
            <div>
              <h2 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
                {guildInfo.name}
              </h2>
              <p className="text-white">
                {guildInfo.realm} - {guildInfo.faction}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 lg:min-h-full">
        <div className="lg:col-span-2 flex flex-col gap-8 lg:h-full">
          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300 flex-1 h-full">
            <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6 flex items-center">
              <InfoIcon className="mr-2 h-6 w-6" /> About Us
            </h2>
            <div className="prose prose-invert max-w-none text-pandaria-dark dark:text-pandaria-light">
              <p>
                Our guild philosophy centers around balancing progression with
                enjoyment. We believe that with proper preparation and
                coordination, we can clear content efficiently without requiring
                excessive time commitments from our members. This allows us to
                maintain a healthy work/life/game balance.
              </p>
              <h3 className="text-xl font-semibold text-pandaria-secondary dark:text-pandaria-accent mt-6 mb-3">
                Our Values
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-pandaria-secondary dark:text-pandaria-accent">
                    Respect:
                  </strong>{' '}
                  We treat all members with respect and expect the same in
                  return. Toxic behavior is not tolerated.
                </li>
                <li>
                  <strong className="text-pandaria-secondary dark:text-pandaria-accent">
                    Preparation:
                  </strong>{' '}
                  We expect raiders to come prepared with consumables, knowledge
                  of encounters, and appropriate gear.
                </li>
                <li>
                  <strong className="text-pandaria-secondary dark:text-pandaria-accent">
                    Attendance:
                  </strong>{' '}
                  While we understand real life comes first, we value consistent
                  attendance for progression raids.
                </li>
                <li>
                  <strong className="text-pandaria-secondary dark:text-pandaria-accent">
                    Improvement:
                  </strong>{' '}
                  We encourage all members to continuously improve and help
                  others do the same.
                </li>
                <li>
                  <strong className="text-pandaria-secondary dark:text-pandaria-accent">
                    Fun:
                  </strong>{' '}
                  Above all, we&apos;re here to have fun and enjoy the game together.
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-pandaria-secondary dark:text-pandaria-accent mt-6 mb-3">
                Guild History
              </h3>
              <p>
                Our roots go back to the guild <strong>Wipe Inc</strong>, where many of our founding members raided together since The Burning Crusade (TBC). As a team, we have steadily cleared all content through the years, culminating in our triumph over the Lich King on heroic difficulty. Our legacy of teamwork and progression continues in Nose Beers But No Gear.
              </p>
            </div>
          </div>

          {/* Raid Schedule */}
          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6 flex items-center">
              <CalendarIcon className="mr-2 h-6 w-6" /> Raid Schedule
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

        {/* Guild Info Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-4 flex items-center">
              <UsersIcon className="mr-2 h-5 w-5" /> Guild Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Founded:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light">
                  {guildInfo.created
                    ? formatDate(guildInfo.created, 'fr-FR')
                    : 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Members:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light">
                  {guildInfo.memberCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Faction:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light">
                  {guildInfo.faction}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Server:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light">
                  {guildInfo.realm}
                </span>
              </div>
              {achievements?.total_points && (
                <div className="flex justify-between">
                  <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                    Achievement Points:
                  </span>
                  <span className="text-pandaria-dark dark:text-pandaria-light">
                    {achievements.total_points}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-4 flex items-center">
              <StarIcon className="mr-2 h-5 w-5" /> Recent Achievements
            </h3>
            {achievements?.recent_events && achievements.recent_events.length > 0 ? (
              <div className="space-y-3">
                {achievements.recent_events.slice(0, 3).map((event, index) => (
                   <div key={index} className="border-l-2 border-pandaria-accent pl-3">
                    <div className="text-pandaria-dark dark:text-pandaria-light font-medium text-sm">
                      {event.achievement.name}
                    </div>
                    <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-xs">
                      {formatDate(event.timestamp, 'fr-FR')}
                    </div>
                    <div className="text-pandaria-secondary dark:text-pandaria-accent text-xs">
                      10 points
                    </div>
                  </div>
                ))}
                {achievements.recent_events.length > 3 && (
                  <div className="text-center pt-2">
                    <span className="text-pandaria-secondary dark:text-pandaria-accent text-sm">
                      +{achievements.recent_events.length - 3} more achievements
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  No recent achievements found
                </p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-4 flex items-center">
              <ActivityIcon className="mr-2 h-5 w-5" /> Recent Activity
            </h3>
            {activity?.activities && activity.activities.length > 0 ? (
              <div className="space-y-3">                
                {activity.activities.slice(0, 4).map((act, index) => (
                    <div key={index} className="border-l-2 border-pandaria-primary pl-3">
                      {act.encounter_completed && (
                        <>
                          <div className="text-pandaria-dark dark:text-pandaria-light font-medium text-sm">
                            {act.encounter_completed.encounter.name} defeated
                          </div>
                          <div className="text-pandaria-secondary dark:text-pandaria-accent text-xs">
                            {act.encounter_completed.mode.name} mode
                          </div>
                        </>
                      )}
                      {act.character_achievement && (
                         <>
                           <div className="text-pandaria-dark dark:text-pandaria-light font-medium text-sm">
                             {act.character_achievement.character.name} earned &ldquo;{act.character_achievement.achievement.name}&rdquo;
                           </div>
                         </>
                       )}
                       {act.guild_achievement && (
                         <div className="text-pandaria-dark dark:text-pandaria-light font-medium text-sm">
                           Guild earned &ldquo;{act.guild_achievement.achievement.achievement.name}&rdquo;
                          </div>
                       )}
                      <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-xs">
                        {formatDate(act.timestamp, 'fr-FR')}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  No recent activity found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
        <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
          Contact & Recruitment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-3">
              How to Apply
            </h3>
            <div className="space-y-3 text-pandaria-dark dark:text-pandaria-light">
              <p>
                We&apos;re always looking for dedicated players who share our values.
                To apply, please:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Join our Discord server</li>
                <li>Fill out an application in the #applications channel</li>
                <li>Include your raid experience and availability</li>
                <li>Be prepared for a trial period</li>
              </ol>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-3">
              What We&apos;re Looking For
            </h3>
            <div className="space-y-3 text-pandaria-dark dark:text-pandaria-light">
              <ul className="list-disc pl-5 space-y-2">
                <li>Consistent attendance (80%+)</li>
                <li>Positive attitude and teamwork</li>
                <li>Willingness to learn and improve</li>
                <li>Proper preparation for raids</li>
                <li>Good communication skills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About