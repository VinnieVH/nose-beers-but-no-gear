import React, { useCallback } from 'react'
import { Link } from 'react-router'
import {
  CalendarIcon,
  UsersIcon,
  TrophyIcon,
  BeerIcon,
  HeartIcon,
} from 'lucide-react'
import { getClassColor } from '../utils/classColors'
import { useGuildData } from '../hooks/useGuildData'

const Home = (): React.JSX.Element => {
  const { guildInfo, members, logs, loading, error } = useGuildData()

  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-pandaria-primary dark:border-pandaria-primaryLight border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-pandaria-dark dark:text-pandaria-light">
          Brewing some Pandaren tea, please wait...
        </p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-pandaria-secondary/10 dark:bg-pandaria-secondary/20 border border-pandaria-secondary rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl text-pandaria-secondary dark:text-pandaria-secondaryLight mb-2">
            Oops! Hozen Mischief!
          </h2>
          <p className="text-pandaria-dark dark:text-pandaria-light">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-pandaria-secondary hover:bg-pandaria-secondaryLight dark:bg-pandaria-secondaryDark dark:hover:bg-pandaria-secondary text-white rounded-lg"
            onClick={handleReload}
          >
            Chase Those Hozen Away
          </button>
        </div>
      </div>
    )
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
              to="/roster"
              className="px-6 py-3 bg-pandaria-primary hover:bg-pandaria-primaryLight dark:bg-pandaria-primaryDark dark:hover:bg-pandaria-primary text-white rounded-full font-medium transition-colors shadow-lg"
            >
              Meet Our Pranksters
            </Link>
            <Link
              to="/raids"
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
                  {guildInfo?.realm}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Faction:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  {guildInfo?.faction}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Members:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  {guildInfo?.memberCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Founded:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  {guildInfo?.created
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
              to="/about"
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
              to="/roster"
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
              {logs.slice(0, 3).map((log, index) => (
                <li
                  key={index}
                  className="border-b border-pandaria-primary/10 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                      {log.raid}
                    </span>
                    <span className="text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm">
                    <span className="text-pandaria-primaryDark dark:text-pandaria-primaryLight mr-4 font-medium">
                      {log.kills} Bosses Pranked
                    </span>
                    <span className="text-pandaria-secondary dark:text-pandaria-secondaryLight">
                      {log.wipes} Oopsies
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/raids"
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
              <span className="text-pandaria-secondary dark:text-pandaria-accent font-semibold">Nose Beers But No Gear</span> is recruiting fun-loving players who don't
              take themselves too seriously! We raid twice a week, drink thrice
              a week, and laugh every day. If you can take a joke and
              occasionally dish one out, you'll fit right in!
            </p>
            <h3 className="text-xl font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-4 font-pandaren">
              Currently Looking For:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg border border-pandaria-primary/10 dark:border-pandaria-primary/30 hover:transform hover:scale-105 transition-transform">
                <img
                  src="https://wow.zamimg.com/images/wow/icons/large/classicon_monk.jpg"
                  alt="Monk"
                  className="w-10 h-10 mr-3 rounded-md"
                />
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Monk
                  </div>
                  <div className="text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
                    Tank/Healer
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg border border-pandaria-primary/10 dark:border-pandaria-primary/30 hover:transform hover:scale-105 transition-transform">
                <img
                  src="https://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg"
                  alt="Priest"
                  className="w-10 h-10 mr-3 rounded-md"
                />
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Priest
                  </div>
                  <div className="text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
                    Healer
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg border border-pandaria-primary/10 dark:border-pandaria-primary/30 hover:transform hover:scale-105 transition-transform">
                <img
                  src="https://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg"
                  alt="Rogue"
                  className="w-10 h-10 mr-3 rounded-md"
                />
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Rogue
                  </div>
                  <div className="text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
                    DPS
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-2 font-pandaren">
                    Raid Schedule:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-pandaria-dark dark:text-pandaria-light">
                      <CalendarIcon className="h-4 w-4 mr-2 text-pandaria-primary dark:text-pandaria-primaryLight" />
                      <span>Tuesday & Thursday 8-11 PM EST</span>
                    </div>
                    <div className="flex items-center text-pandaria-dark dark:text-pandaria-light">
                      <TrophyIcon className="h-4 w-4 mr-2 text-pandaria-primary dark:text-pandaria-primaryLight" />
                      <span>Progression & Fun Focused</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-2 font-pandaren">
                    What We Offer:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-pandaria-dark dark:text-pandaria-light">
                      <BeerIcon className="h-4 w-4 mr-2 text-pandaria-primary dark:text-pandaria-primaryLight" />
                      <span>Unlimited dad jokes</span>
                    </div>
                    <div className="flex items-center text-pandaria-dark dark:text-pandaria-light">
                      <HeartIcon className="h-4 w-4 mr-2 text-pandaria-primary dark:text-pandaria-primaryLight" />
                      <span>A friendly, welcoming community</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-pandaria-primary hover:bg-pandaria-primaryLight dark:bg-pandaria-primaryDark dark:hover:bg-pandaria-primary text-white rounded-full font-medium transition-colors shadow-lg"
                >
                  <UsersIcon className="h-5 w-5 mr-2" />
                  Join the Madness
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
