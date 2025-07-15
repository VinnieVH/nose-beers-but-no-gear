import React from 'react'
import Image from 'next/image'
import { CalendarIcon, UsersIcon, InfoIcon, StarIcon, ActivityIcon } from 'lucide-react'

// Hardcoded data to replace hooks
const guildInfo = {
  realm: 'Area 52',
  faction: 'Alliance',
  memberCount: 25,
  created: '2023-01-15T00:00:00.000Z',
  name: 'Nose Beers But No Gear'
}

const achievements = [
  { id: 1, name: 'Server 5th Ragnaros kill', date: '2023-06-15' },
  { id: 2, name: 'Server 7th Nefarian kill', date: '2023-07-20' },
  { id: 3, name: 'Server 10th C\'Thun kill', date: '2023-08-10' },
  { id: 4, name: 'Currently progressing through Naxxramas', date: '2023-09-01' }
]

const activity = [
  { type: 'Raid', description: 'Mogu\'shan Vaults - 6/6', date: '2024-01-15' },
  { type: 'Raid', description: 'Heart of Fear - 5/6', date: '2024-01-10' },
  { type: 'Raid', description: 'Terrace of Endless Spring - 4/4', date: '2024-01-05' },
  { type: 'Social', description: 'Guild Meeting', date: '2024-01-12' }
]

const About = (): React.JSX.Element => {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
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
              <p>Some of our notable achievements include:</p>
              <ul className="list-disc pl-5 space-y-2">
                {achievements.map((achievement) => (
                  <li key={achievement.id}>{achievement.name}</li>
                ))}
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
                  {guildInfo.created
                    ? new Date(guildInfo.created).toLocaleDateString()
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
            </div>
          </div>

          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-4 flex items-center">
              <StarIcon className="mr-2 h-5 w-5" /> Recent Achievements
            </h3>
            <div className="space-y-3">
              {achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="border-b border-pandaria-primary/10 pb-2 last:border-0 last:pb-0">
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">
                    {achievement.name}
                  </div>
                  <div className="text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
                    {achievement.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-4 flex items-center">
              <ActivityIcon className="mr-2 h-5 w-5" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {activity.slice(0, 4).map((item, index) => (
                <div key={index} className="border-b border-pandaria-primary/10 pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
                      {item.type}
                    </span>
                    <span className="text-pandaria-primary dark:text-pandaria-primaryLight text-sm">
                      {item.date}
                    </span>
                  </div>
                  <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Raid Schedule */}
      <div className="bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300 mb-8">
        <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6 flex items-center">
          <CalendarIcon className="mr-2 h-6 w-6" /> Raid Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-3">
              Progression Raids
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg">
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">Tuesday</div>
                  <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">8:00 PM - 11:00 PM EST</div>
                </div>
                <div className="text-pandaria-primary dark:text-pandaria-primaryLight font-medium">Progression</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg">
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">Thursday</div>
                  <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">8:00 PM - 11:00 PM EST</div>
                </div>
                <div className="text-pandaria-primary dark:text-pandaria-primaryLight font-medium">Progression</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-3">
              Social Events
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg">
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">Friday</div>
                  <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">7:00 PM - 9:00 PM EST</div>
                </div>
                <div className="text-pandaria-accent dark:text-pandaria-accentLight font-medium">Social Night</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-pandaria-paper dark:bg-pandaria-primary/10 rounded-lg">
                <div>
                  <div className="text-pandaria-dark dark:text-pandaria-light font-medium">Sunday</div>
                  <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-sm">2:00 PM - 5:00 PM EST</div>
                </div>
                <div className="text-pandaria-accent dark:text-pandaria-accentLight font-medium">Alt Raid</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruitment Info */}
      <div className="bg-pandaria-paper dark:bg-pandaria-dark/40 rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300">
        <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent mb-6">
          Join Our Guild
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-3">
              What We&apos;re Looking For
            </h3>
            <ul className="space-y-2 text-pandaria-dark dark:text-pandaria-light">
              <li>• Players who can commit to our raid schedule</li>
              <li>• Team players who value progression and fun</li>
              <li>• Mature individuals who can handle constructive criticism</li>
              <li>• Players willing to prepare for raids (consumables, research)</li>
              <li>• People who enjoy a friendly, social atmosphere</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-pandaria-primary dark:text-pandaria-primaryLight mb-3">
              What We Offer
            </h3>
            <ul className="space-y-2 text-pandaria-dark dark:text-pandaria-light">
              <li>• Organized progression raiding</li>
              <li>• Friendly, supportive community</li>
              <li>• Guild bank for consumables</li>
              <li>• Discord server for communication</li>
              <li>• Social events and activities</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-pandaria-dark dark:text-pandaria-light mb-4">
            Interested in joining? Contact our officers in-game or reach out on Discord!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-pandaria-secondary dark:text-pandaria-accent font-semibold">Guild Master</div>
              <div className="text-pandaria-dark dark:text-pandaria-light">Axecleaver</div>
            </div>
            <div className="text-center">
              <div className="text-pandaria-secondary dark:text-pandaria-accent font-semibold">Raid Leader</div>
              <div className="text-pandaria-dark dark:text-pandaria-light">Lightbringer</div>
            </div>
            <div className="text-center">
              <div className="text-pandaria-secondary dark:text-pandaria-accent font-semibold">Officer</div>
              <div className="text-pandaria-dark dark:text-pandaria-light">Firemage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About