import { useGuild } from '../context/GuildContext'

const Raids = () => {
  const { logs, loading, error } = useGuild()
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 border-4 border-pandaria-primary dark:border-pandaria-primaryLight border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-pandaria-dark dark:text-pandaria-light">
          Loading raid logs...
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
        Raid Progression
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Progress Overview */}
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
        <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
            Current Progress
        </h2>
        <div className="space-y-6">
            <div>
            <div className="flex justify-between mb-2">
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                Mogu'shan Vaults
                </span>
                <span className="text-pandaria-primary dark:text-pandaria-primaryLight">
                6/6
                </span>
            </div>
            <div className="w-full bg-pandaria-paper dark:bg-pandaria-dark/50 rounded-full h-2.5">
                <div
                className="bg-pandaria-primary dark:bg-pandaria-primaryLight h-2.5 rounded-full"
                style={{
                    width: '100%',
                }}
                ></div>
            </div>
            </div>
            <div>
            <div className="flex justify-between mb-2">
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                Heart of Fear
                </span>
                <span className="text-pandaria-primary dark:text-pandaria-primaryLight">
                5/6
                </span>
            </div>
            <div className="w-full bg-pandaria-paper dark:bg-pandaria-dark/50 rounded-full h-2.5">
                <div
                className="bg-pandaria-primary dark:bg-pandaria-primaryLight h-2.5 rounded-full"
                style={{
                    width: '83.3%',
                }}
                ></div>
            </div>
            </div>
            <div>
            <div className="flex justify-between mb-2">
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                Terrace of Endless Spring
                </span>
                <span className="text-pandaria-accent dark:text-pandaria-accentLight">
                4/4
                </span>
            </div>
            <div className="w-full bg-pandaria-paper dark:bg-pandaria-dark/50 rounded-full h-2.5">
                <div
                className="bg-pandaria-accent dark:bg-pandaria-accentLight h-2.5 rounded-full"
                style={{
                    width: '100%',
                }}
                ></div>
            </div>
            </div>
            <div>
            <div className="flex justify-between mb-2">
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                Throne of Thunder
                </span>
                <span className="text-pandaria-accent dark:text-pandaria-accentLight">
                10/13
                </span>
            </div>
            <div className="w-full bg-pandaria-paper dark:bg-pandaria-dark/50 rounded-full h-2.5">
                <div
                className="bg-pandaria-accent dark:bg-pandaria-accentLight h-2.5 rounded-full"
                style={{
                    width: '76.9%',
                }}
                ></div>
            </div>
            </div>
            <div>
            <div className="flex justify-between mb-2">
                <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                Siege of Orgrimmar
                </span>
                <span className="text-pandaria-secondary dark:text-pandaria-secondaryLight">
                8/14
                </span>
            </div>
            <div className="w-full bg-pandaria-paper dark:bg-pandaria-dark/50 rounded-full h-2.5">
                <div
                className="bg-pandaria-secondary dark:bg-pandaria-secondaryLight h-2.5 rounded-full"
                style={{
                    width: '57.1%',
                }}
                ></div>
            </div>
            </div>
        </div>
        </div>

        {/* Best Performances */}
        <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
          <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
            Best Performances
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="https://wow.zamimg.com/images/wow/icons/large/ability_warrior_innerrage.jpg"
                alt="Warrior"
                className="w-12 h-12 rounded border border-pandaria-secondary/50 dark:border-pandaria-accent/50 mr-4"
              />
              <div>
                <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  Axecleaver
                </div>
                <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  Warrior - 99% Ragnaros
                </div>
              </div>
              <div className="ml-auto text-pandaria-primary dark:text-pandaria-primaryLight font-bold">
                99%
              </div>
            </div>
            <div className="flex items-center">
              <img
                src="https://wow.zamimg.com/images/wow/icons/large/spell_holy_holybolt.jpg"
                alt="Paladin"
                className="w-12 h-12 rounded border border-pandaria-secondary/50 dark:border-pandaria-accent/50 mr-4"
              />
              <div>
                <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  Lightbringer
                </div>
                <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  Paladin - 97% Nefarian
                </div>
              </div>
              <div className="ml-auto text-pandaria-primary dark:text-pandaria-primaryLight font-bold">
                97%
              </div>
            </div>
            <div className="flex items-center">
              <img
                src="https://wow.zamimg.com/images/wow/icons/large/spell_fire_firebolt02.jpg"
                alt="Mage"
                className="w-12 h-12 rounded border border-pandaria-secondary/50 dark:border-pandaria-accent/50 mr-4"
              />
              <div>
                <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  Firemage
                </div>
                <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  Mage - 95% C'Thun
                </div>
              </div>
              <div className="ml-auto text-pandaria-primary dark:text-pandaria-primaryLight font-bold">
                95%
              </div>
            </div>
            <div className="flex items-center">
              <img
                src="https://wow.zamimg.com/images/wow/icons/large/spell_shadow_shadowwordpain.jpg"
                alt="Priest"
                className="w-12 h-12 rounded border border-pandaria-secondary/50 dark:border-pandaria-accent/50 mr-4"
              />
              <div>
                <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                  Healbot
                </div>
                <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                  Priest - 94% Twin Emperors
                </div>
              </div>
              <div className="ml-auto text-pandaria-primary dark:text-pandaria-primaryLight font-bold">
                94%
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Logs */}
      <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
        Recent Raid Logs
      </h2>
      <div className="bg-white dark:bg-pandaria-dark rounded-lg overflow-hidden border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg mb-8 transition-colors duration-300">
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
                  Bosses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Wipes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pandaria-secondary dark:text-pandaria-accent uppercase tracking-wider">
                  Best Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pandaria-primary/10 dark:divide-pandaria-primary/20">
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className="hover:bg-pandaria-paper dark:hover:bg-pandaria-primary/10 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-pandaria-dark dark:text-pandaria-light">
                      {log.raid}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pandaria-dark dark:text-pandaria-light/80">
                    {new Date(log.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pandaria-primary/20 dark:bg-pandaria-primary/30 text-pandaria-primary dark:text-pandaria-primaryLight">
                      {log.kills} Kills
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pandaria-secondary/20 dark:bg-pandaria-secondary/30 text-pandaria-secondary dark:text-pandaria-secondaryLight">
                      {log.wipes} Wipes
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 rounded-full ${getPerformanceColor(log.bestPerformance)}`}
                        style={{
                          width: `${log.bestPerformance}%`,
                        }}
                      ></div>
                      <span className="ml-2 text-sm text-pandaria-dark dark:text-pandaria-light/80">
                        {log.bestPerformance}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Warcraftlogs Integration */}
      <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
        <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
          Warcraftlogs Integration
        </h2>
        <div className="flex items-center justify-center p-6 border border-dashed border-pandaria-primary/30 dark:border-pandaria-primary/40 rounded-lg">
          <div className="text-center">
            <img
              src="https://assets.rpglogs.com/img/warcraft/favicon.png"
              alt="Warcraftlogs Logo"
              className="w-16 h-16 mx-auto mb-4"
            />
            <p className="text-pandaria-dark dark:text-pandaria-light mb-4">
              View our detailed raid performance on Warcraftlogs
            </p>
            <a
              href="https://classic.warcraftlogs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-pandaria-secondary hover:bg-pandaria-secondaryLight dark:bg-pandaria-secondaryDark dark:hover:bg-pandaria-secondary text-white rounded-md font-medium transition-colors"
            >
              View on Warcraftlogs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
// Helper function to get performance color based on percentage
const getPerformanceColor = (percentage: number) => {
  if (percentage >= 95) return 'bg-pandaria-accent dark:bg-pandaria-accentLight' // Legendary
  if (percentage >= 75)
    return 'bg-pandaria-primary dark:bg-pandaria-primaryLight' // Epic
  if (percentage >= 50)
    return 'bg-pandaria-primaryDark dark:bg-pandaria-primary' // Rare
  if (percentage >= 25)
    return 'bg-pandaria-accentDark dark:bg-pandaria-accentLight' // Uncommon
  return 'bg-pandaria-secondary dark:bg-pandaria-secondaryLight' // Common
}
export default Raids
