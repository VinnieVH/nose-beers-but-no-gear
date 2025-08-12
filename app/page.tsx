import React from 'react'
import Link from 'next/link'
import { UsersIcon, TrophyIcon } from 'lucide-react'
import { DISCORD_INVITE_URL } from './config/guild'
import type { GuildInfo, Member } from './lib/types'
import type { WowGuildMember } from './shared/types'
import { getBaseUrl, getClassColor, getClassNameById } from './lib/utils'
import { WowClass, MemberRole, WowFaction } from './shared/enums'

export default async function Home(): Promise<React.JSX.Element> {
  // Fetch data using Next.js recommended pattern
  let guildInfo: GuildInfo
  let members: Member[]

  try {
    // Fetch from Blizzard roster API
    const baseUrl = getBaseUrl()
    const data = await fetch(`${baseUrl}/api/blizzard/roster`, {
      cache: 'no-store'
    })
    if (data.ok) {
      const responseData = await data.json()
      // Map Blizzard API response to GuildInfo and Member[]
      guildInfo = {
        name: responseData.guild.name,
        realm: responseData.guild.realm.name,
        faction: responseData.guild.faction.name,
        created: responseData.guild.created_timestamp
          ? new Date(responseData.guild.created_timestamp).toISOString()
          : '',
        level: 0, // Not available in Blizzard API
        memberCount: responseData.members.length,
        description: '' // Not available in Blizzard API
      }
      members = responseData.members.map((m: WowGuildMember) => ({
        name: m.character.name,
        level: m.character.level,
        class: getClassNameById(m.character.playable_class.id),
        rank: m.rank.toString(),
        role: '' // Not available in Blizzard API
      }))

    } else {
      throw new Error(`API request failed: ${data.status}`)
    }
  } catch (error) {
    console.error('Using fallback data:', error)
    // Use fallback data if API fails
    guildInfo = {
      name: 'Nose Beers But No Gear',
      realm: 'Pyrewood Village',
      faction: WowFaction.Alliance,
      created: '2012-09-25T00:00:00Z',
      level: 25,
      memberCount: 6,
      description: 'A cheeky guild of mischief-makers focused on having fun while still clearing content.'
    }
    members = [
      { name: 'Brewmaster', level: 90, class: WowClass.Monk, race: 'Pandaren', rank: 'Guild Master', role: MemberRole.Tank, averageItemLevel: 0 },
      { name: 'MistyWhiskers', level: 90, class: WowClass.Monk, race: 'Pandaren', rank: 'Officer', role: MemberRole.Healer, averageItemLevel: 0 },
      { name: 'PawsOfFury', level: 90, class: WowClass.Monk, race: 'Pandaren', rank: 'Officer', role: MemberRole.DPS, averageItemLevel: 0 },
      { name: 'NoodleMaster', level: 90, class: WowClass.Monk, race: 'Pandaren', rank: 'Chef', role: MemberRole.Feeder, averageItemLevel: 0 },
      { name: 'BambooChewer', level: 90, class: WowClass.Druid, race: 'Pandaren', rank: 'Raider', role: MemberRole.Tank, averageItemLevel:0 },
      { name: 'MistyMist', level: 90, class: WowClass.Mage, race: 'Pandaren', rank: 'Raider', role: MemberRole.DPS, averageItemLevel: 0 }
    ]
  }

  return (
    <div className="w-full transition-colors duration-300">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/998/430/456/world-of-warcraft-warcraft-wow-art-wallpaper-preview.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-pandaria-dark/60 dark:bg-pandaria-dark/80"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pandaria-secondary dark:text-pandaria-accent text-center mb-4 font-pandaren drop-shadow-lg">
            Nose Beers But No Gear
          </h1>
          <p className="text-xl md:text-2xl text-white text-center max-w-2xl drop-shadow-md">
            Where we take our nose beers seriously, but everything else is fair game
            for a laugh!
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/roster"
              className="px-6 py-3 bg-pandaria-primary hover:bg-pandaria-primaryLight dark:bg-pandaria-primaryDark dark:hover:bg-pandaria-primary text-white rounded-full font-medium transition-colors shadow-lg"
            >
              Meet Our Gamers
            </Link>
            <Link
              href="/raids"
              className="px-6 py-3 bg-pandaria-accent hover:bg-pandaria-accentLight dark:bg-pandaria-accentDark dark:hover:bg-pandaria-accent text-pandaria-dark dark:text-white rounded-full font-medium transition-colors shadow-lg"
            >
              Raid Shenanigans
            </Link>
          </div>
        </div>
      </div>

      {/* Guild Info Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-pandaria-dark rounded-xl p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-pandaria-primary/20 dark:bg-pandaria-primary/30 rounded-full mr-4">
                <UsersIcon className="h-6 w-6 text-pandaria-primary dark:text-pandaria-primaryLight" />
              </div>
              <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent font-pandaren">
                Guild Stats
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Realm:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  {guildInfo.realm}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Faction:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  {guildInfo.faction}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Members:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  {guildInfo.memberCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Founded:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  {guildInfo.created
                    ? new Date(guildInfo.created).toLocaleDateString()
                    : 'When the mists parted'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Beer Consumed:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  Way too many!
                </span>
              </div>
            </div>
            <Link
              href="/about"
              className="block mt-6 text-pandaria-primary hover:text-pandaria-secondary dark:hover:text-pandaria-accent text-sm font-medium"
            >
              Learn more about our shenanigans →
            </Link>
          </div>
          <div className="bg-white dark:bg-pandaria-dark rounded-xl p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-pandaria-primary/20 dark:bg-pandaria-primary/30 rounded-full mr-4">
                <UsersIcon className="h-6 w-6 text-pandaria-primary dark:text-pandaria-primaryLight" />
              </div>
              <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent font-pandaren">
                Our Pranksters
              </h2>
            </div>
            <ul className="space-y-3">
              {members.slice(0, 5).map((member, index) => (
                <li
                  key={index}
                  className="flex items-center bg-pandaria-paper/50 dark:bg-pandaria-primary/10 p-2 rounded-lg"
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${getClassColor(member.class)}`}
                  ></div>
                  <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    {member.name}
                  </span>
                  <span className="ml-auto text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
                    {member.role === 'Feeder'
                      ? '🍜 ' + member.role
                      : member.role}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/roster"
              className="block mt-6 text-pandaria-primary hover:text-pandaria-secondary dark:hover:text-pandaria-accent text-sm font-medium"
            >
              See all our silly pandas →
            </Link>
          </div>
          <div className="bg-white dark:bg-pandaria-dark rounded-xl p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-pandaria-primary/20 dark:bg-pandaria-primary/30 rounded-full mr-4">
                <TrophyIcon className="h-6 w-6 text-pandaria-primary dark:text-pandaria-primaryLight" />
              </div>
              <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent font-pandaren">
                Recent Adventures
              </h2>
            </div>
            <ul className="space-y-3">
              {true ? (
                <li className="flex flex-col items-center justify-center py-8">
                  <svg className="w-12 h-12 text-pandaria-primary dark:text-pandaria-primaryLight mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-base text-center">
                    No adventures logged yet for this expansion.<br />Check back after our first raid!
                  </span>
                </li>
              ) : (
                /* Render logs here if present */
                null
              )}
            </ul>
            <Link
              href="/raids"
              className="block mt-6 text-pandaria-primary hover:text-pandaria-secondary dark:hover:text-pandaria-accent text-sm font-medium"
            >
              See all our adventures →
            </Link>
          </div>
        </div>
      </div>

      {/* Recruitment Section */}
      <div className="bg-pandaria-paper dark:bg-pandaria-dark/40 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent text-center mb-8 font-pandaren">
            Join Our Discord
          </h2>
          <p className="text-pandaria-dark dark:text-pandaria-light text-lg text-center mb-6 max-w-2xl">
            Want to raid, hang out, or just share a laugh? Our Discord is the heart of our community. Click below to join the fun!
          </p>
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-pandaria-primary hover:bg-pandaria-primaryLight dark:bg-pandaria-primaryDark dark:hover:bg-pandaria-primary text-white text-xl font-bold rounded-full shadow-lg transition-colors duration-200"
          >
            Join Our Discord
          </a>
        </div>
      </div>
    </div>
  )
}
