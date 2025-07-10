import { Link } from 'react-router'
import { useGuild } from '../context/GuildContext'
import {
  CalendarIcon,
  UsersIcon,
  TrophyIcon,
  BeerIcon,
  HeartIcon,
} from 'lucide-react'

const Home = () => {
  const { guildInfo, members, logs, loading, error } = useGuild()
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
            onClick={() => window.location.reload()}
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
                    High Priority
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg border border-pandaria-primary/10 dark:border-pandaria-primary/30 hover:transform hover:scale-105 transition-transform">
                <img
                  src="https://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg"
                  alt="Shaman"
                  className="w-10 h-10 mr-3 rounded-md"
                />
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Shaman
                  </div>
                  <div className="text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
                    High Priority
                  </div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg border border-pandaria-primary/10 dark:border-pandaria-primary/30 hover:transform hover:scale-105 transition-transform">
                <img
                  src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_beer_01.jpg"
                  alt="Brewmaster"
                  className="w-10 h-10 mr-3 rounded-md"
                />
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Brewmaster
                  </div>
                  <div className="text-pandaria-accent dark:text-pandaria-accentLight text-sm">
                    Medium Priority
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
                  <div className="text-pandaria-secondary dark:text-pandaria-secondaryLight text-sm">
                    Low Priority
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-pandaria-secondary hover:bg-pandaria-secondaryLight dark:bg-pandaria-secondaryDark dark:hover:bg-pandaria-secondary text-white rounded-full font-medium transition-colors inline-flex items-center shadow-lg"
              >
                <HeartIcon className="h-5 w-5 mr-2" />
                Apply for Nose Beers But No Gear
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Raid Schedule */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent text-center mb-8 font-pandaren">
          When We Cause Trouble
        </h2>
        <div className="max-w-3xl mx-auto bg-white dark:bg-pandaria-dark rounded-xl p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <div className="flex items-center mb-6">
            <CalendarIcon className="h-6 w-6 text-pandaria-primary dark:text-pandaria-primaryLight mr-3" />
            <h3 className="text-xl font-semibold text-pandaria-secondary dark:text-pandaria-accent font-pandaren">
              Weekly Shenanigans
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-pandaria-primary/10 dark:border-pandaria-primary/20">
              <div>
                <h4 className="text-lg font-medium text-pandaria-primary dark:text-pandaria-primaryLight">
                  Mogu'shan Vaults
                </h4>
                <p className="text-pandaria-dark dark:text-pandaria-light">
                  Where we turn stone guardians into garden gnomes
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="inline-block px-4 py-1 bg-pandaria-primary/10 dark:bg-pandaria-primary/20 text-pandaria-primary dark:text-pandaria-primaryLight rounded-full text-sm font-medium">
                  Wednesday 8:00 PM - 11:00 PM Server
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-pandaria-primary/10 dark:border-pandaria-primary/20">
              <div>
                <h4 className="text-lg font-medium text-pandaria-primary dark:text-pandaria-primaryLight">
                  Heart of Fear
                </h4>
                <p className="text-pandaria-dark dark:text-pandaria-light">
                  We're not scared, we just scream for fun!
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="inline-block px-4 py-1 bg-pandaria-primary/10 dark:bg-pandaria-primary/20 text-pandaria-primary dark:text-pandaria-primaryLight rounded-full text-sm font-medium">
                  Sunday 7:00 PM - 11:00 PM Server
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-pandaria-primary dark:text-pandaria-primaryLight">
                  Pandaria Pub Crawl
                </h4>
                <p className="text-pandaria-dark dark:text-pandaria-light">
                  Because we take our drinking seriously!
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="inline-block px-4 py-1 bg-pandaria-primary/10 dark:bg-pandaria-primary/20 text-pandaria-primary dark:text-pandaria-primaryLight rounded-full text-sm font-medium">
                  Friday 8:00 PM - Until we can't stand
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-pandaria-primary/10 dark:border-pandaria-primary/20">
            <p className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm flex items-center">
              <BeerIcon className="h-4 w-4 mr-2 text-pandaria-accent dark:text-pandaria-accentLight" />
              Invites start 30 minutes before raid time. Please bring your own
              brew and snacks!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
// Helper function to get class colors for the new color theme
const getClassColor = (className: string) => {
  const classColors = {
    Monk: 'bg-pandaria-primary',
    Warrior: 'bg-pandaria-secondary',
    Paladin: 'bg-pandaria-accent',
    Hunter: 'bg-pandaria-primaryDark',
    Rogue: 'bg-pandaria-accentDark',
    Priest: 'bg-white dark:bg-gray-200',
    Shaman: 'bg-pandaria-primary',
    Mage: 'bg-pandaria-primaryLight',
    Warlock: 'bg-pandaria-secondaryLight',
    Druid: 'bg-pandaria-accentLight',
    'Death Knight': 'bg-pandaria-secondaryDark',
  }
  return classColors[className as keyof typeof classColors] || 'bg-gray-500'
}
export default Home
