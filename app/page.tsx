import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  UsersIcon,
  TrophyIcon,
  BeerIcon,
  HeartIcon,
} from 'lucide-react'
import type { GuildInfo, Member } from './lib/types'
import type { WowGuildMember } from './shared/types'
import { getBaseUrl, getClassColor, getClassNameById } from './lib/utils'

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
      console.log(responseData)
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

      console.log(guildInfo)
    } else {
      throw new Error(`API request failed: ${data.status}`)
    }
  } catch (error) {
    console.error('Using fallback data:', error)
    // Use fallback data if API fails
    guildInfo = {
      name: 'Nose Beers But No Gear',
      realm: 'Area 52',
      faction: 'Alliance',
      created: '2012-09-25T00:00:00Z',
      level: 25,
      memberCount: 6,
      description: 'A cheeky guild of mischief-makers focused on having fun while still clearing content.'
    }
    members = [
      { name: 'Brewmaster', level: 90, class: 'Monk', rank: 'Guild Master', role: 'Tank' },
      { name: 'MistyWhiskers', level: 90, class: 'Monk', rank: 'Officer', role: 'Healer' },
      { name: 'PawsOfFury', level: 90, class: 'Monk', rank: 'Officer', role: 'DPS' },
      { name: 'NoodleMaster', level: 90, class: 'Monk', rank: 'Chef', role: 'Feeder' },
      { name: 'BambooChewer', level: 90, class: 'Druid', rank: 'Raider', role: 'Tank' },
      { name: 'MistyMist', level: 90, class: 'Mage', rank: 'Raider', role: 'DPS' }
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
              Meet Our Pranksters
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
              {/* Logs data removed as per new_code */}
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
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent text-center mb-8 font-pandaren">
            Join Our Merry Band of Misfits!
          </h2>
          <div className="max-w-3xl mx-auto bg-white dark:bg-pandaria-dark rounded-xl p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <p className="text-pandaria-dark dark:text-pandaria-light mb-6">
              <span className="text-pandaria-secondary dark:text-pandaria-accent font-semibold">Nose Beers But No Gear</span> is recruiting fun-loving players who don&apos;t
              take themselves too seriously! We raid twice a week, drink thrice
              a week, and laugh every day. If you can take a joke and
              occasionally dish one out, you&apos;ll fit right in!
            </p>
            <h3 className="text-xl font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-4 font-pandaren">
              Currently Looking For:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg border border-pandaria-primary/10 dark:border-pandaria-primary/30 hover:transform hover:scale-105 transition-transform">
                <Image
                  src="https://wow.zamimg.com/images/wow/icons/large/classicon_monk.jpg"
                  alt="Monk"
                  width={40}
                  height={40}
                  className="w-10 h-10 mr-3 rounded-md"
                />
                <div>
                  <h4 className="font-semibold text-pandaria-dark dark:text-pandaria-light">Monk</h4>
                  <p className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">Tank/Healer</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg border border-pandaria-primary/10 dark:border-pandaria-primary/30 hover:transform hover:scale-105 transition-transform">
                <Image
                  src="https://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg"
                  alt="Priest"
                  width={40}
                  height={40}
                  className="w-10 h-10 mr-3 rounded-md"
                />
                <div>
                  <h4 className="font-semibold text-pandaria-dark dark:text-pandaria-light">Priest</h4>
                  <p className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">Healer</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg border border-pandaria-primary/10 dark:border-pandaria-primary/30 hover:transform hover:scale-105 transition-transform">
                <Image
                  src="https://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg"
                  alt="Mage"
                  width={40}
                  height={40}
                  className="w-10 h-10 mr-3 rounded-md"
                />
                <div>
                  <h4 className="font-semibold text-pandaria-dark dark:text-pandaria-light">Mage</h4>
                  <p className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">DPS</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-pandaria-dark dark:text-pandaria-light mb-4">
                <strong>Requirements:</strong> Sense of humor, ability to laugh at yourself, and a love for craft beer!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center text-pandaria-primary dark:text-pandaria-primaryLight">
                  <BeerIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">Beer Appreciation</span>
                </div>
                <div className="flex items-center text-pandaria-primary dark:text-pandaria-primaryLight">
                  <HeartIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">Good Vibes</span>
                </div>
                <div className="flex items-center text-pandaria-primary dark:text-pandaria-primaryLight">
                  <TrophyIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm">Casual Raiding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
