import { useGuild } from '../context/GuildContext'
import { CalendarIcon, UsersIcon, TrophyIcon, InfoIcon } from 'lucide-react'
const About = () => {
  const { guildInfo, loading, error } = useGuild()
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-pandaria-primary dark:border-pandaria-primaryLight border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-pandaria-dark dark:text-pandaria-light">
          Loading guild information...
        </p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-pandaria-secondary/10 dark:bg-pandaria-secondary/20 border border-pandaria-secondary rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl text-pandaria-secondary dark:text-pandaria-secondaryLight mb-2">
            Error
          </h2>
          <p className="text-pandaria-dark dark:text-pandaria-light">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-pandaria-secondary hover:bg-pandaria-secondaryLight dark:bg-pandaria-secondaryDark dark:hover:bg-pandaria-secondary text-white rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-8">
        About Our Guild
      </h1>
      {/* Guild Banner */}
      <div className="relative rounded-lg overflow-hidden h-64 mb-12">
        <img
          src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/RTSFS08YGYJ91562639994982.jpg"
          alt="Guild Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pandaria-dark to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex items-center">
            <img
              src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg"
              alt="Guild Logo"
              className="w-16 h-16 rounded border-2 border-pandaria-accent mr-4"
            />
            <div>
              <h2 className="text-3xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
                {guildInfo?.name}
              </h2>
              <p className="text-white">
                {guildInfo?.realm} - {guildInfo?.faction}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6 flex items-center">
              <InfoIcon className="mr-2 h-6 w-6" /> About Us
            </h2>
            <div className="prose prose-invert max-w-none text-pandaria-dark dark:text-pandaria-light">
              <p>
                Azeroth Legends is a semi-hardcore raiding guild focused on
                progressing through all PvE content while maintaining a fun and
                friendly environment. Founded in August 2019 at the launch of
                WoW Classic, we've been steadily growing and tackling all
                content the game has to offer.
              </p>
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
                  Above all, we're here to have fun and enjoy the game together.
                </li>
              </ul>
              <h3 className="text-xl font-semibold text-pandaria-secondary dark:text-pandaria-accent mt-6 mb-3">
                Guild History
              </h3>
              <p>
                Founded at the launch of WoW Classic, Azeroth Legends quickly
                established itself as a competent raiding guild on the Whitemane
                server. We were among the first guilds on the server to clear
                Molten Core and have since maintained a steady pace of
                progression through all raid tiers.
              </p>
              <p>Some of our notable achievements include:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Server 5th Ragnaros kill</li>
                <li>Server 7th Nefarian kill</li>
                <li>Server 10th C'Thun kill</li>
                <li>Currently progressing through Naxxramas</li>
              </ul>
            </div>
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
                  {guildInfo?.created
                    ? new Date(guildInfo.created).toLocaleDateString()
                    : 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Members:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light">
                  {guildInfo?.memberCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Faction:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light">
                  {guildInfo?.faction}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
                  Server:
                </span>
                <span className="text-pandaria-dark dark:text-pandaria-light">
                  {guildInfo?.realm}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-4 flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" /> Raid Schedule
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  Main Raid
                </div>
                <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  Wednesday 8:00 PM - 11:00 PM
                </div>
              </div>
              <div>
                <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  Progression Raid
                </div>
                <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  Sunday 7:00 PM - 11:00 PM
                </div>
              </div>
              <div>
                <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  PvP Night
                </div>
                <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  Monday 8:00 PM - 10:00 PM
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-4 flex items-center">
              <TrophyIcon className="mr-2 h-5 w-5" /> Leadership
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pandaria-secondary dark:bg-pandaria-secondaryLight flex items-center justify-center mr-3">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Lightbringer
                  </div>
                  <div className="text-pandaria-secondary dark:text-pandaria-accent text-sm">
                    Guild Master
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pandaria-primary dark:bg-pandaria-primaryLight flex items-center justify-center mr-3">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Shadowstep
                  </div>
                  <div className="text-pandaria-secondary dark:text-pandaria-accent text-sm">
                    Officer - Raid Leader
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pandaria-accent dark:bg-pandaria-accentLight flex items-center justify-center mr-3">
                  <span className="text-pandaria-dark font-bold">F</span>
                </div>
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Firemage
                  </div>
                  <div className="text-pandaria-secondary dark:text-pandaria-accent text-sm">
                    Officer - Recruitment
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-pandaria-primaryDark dark:bg-pandaria-primary flex items-center justify-center mr-3">
                  <span className="text-white font-bold">H</span>
                </div>
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    Healbot
                  </div>
                  <div className="text-pandaria-secondary dark:text-pandaria-accent text-sm">
                    Officer - Loot Council
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Join Us Section */}
      <div className="bg-white dark:bg-pandaria-dark rounded-lg p-8 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-4">
            Interested in Joining?
          </h2>
          <p className="text-pandaria-dark dark:text-pandaria-light mb-6">
            We're always looking for skilled and dedicated players to join our
            ranks. If you're interested in becoming a part of Azeroth Legends,
            please reach out to us on Discord or in-game.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-pandaria-primary hover:bg-pandaria-primaryLight dark:bg-pandaria-primaryDark dark:hover:bg-pandaria-primary text-white rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join our Discord
            </a>
            <button className="px-6 py-3 bg-pandaria-secondary hover:bg-pandaria-secondaryLight dark:bg-pandaria-secondaryDark dark:hover:bg-pandaria-secondary text-white rounded-md font-medium transition-colors">
              Apply In-Game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About
