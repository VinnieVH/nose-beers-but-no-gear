import React from 'react'
import { Link } from 'react-router'
import { UsersIcon } from 'lucide-react'
import Card from '../ui/Card'
import StatItem from '../ui/StatItem'
import type { GuildInfo } from '../../shared/types'

interface GuildStatsCardProps {
  guildInfo: GuildInfo | null
  showBeerCount?: boolean
  showLearnMore?: boolean
  className?: string
}

const GuildStatsCard = ({ 
  guildInfo, 
  showBeerCount = true, 
  showLearnMore = true,
  className = ''
}: GuildStatsCardProps): React.JSX.Element => {
  return (
    <Card 
      title="Guild Stats" 
      icon={<UsersIcon className="h-6 w-6 text-pandaria-primary dark:text-pandaria-primaryLight" />}
      className={className}
    >
      <div className="space-y-3">
        <StatItem label="Realm" value={guildInfo?.realm || 'Unknown'} />
        <StatItem label="Faction" value={guildInfo?.faction || 'Unknown'} />
        <StatItem label="Members" value={guildInfo?.memberCount || 0} />
        <StatItem 
          label="Founded" 
          value={guildInfo?.created 
            ? new Date(guildInfo.created).toLocaleDateString()
            : 'When the mists parted'
          } 
        />
        {showBeerCount && (
          <StatItem label="Beer Consumed" value="Way too many!" />
        )}
      </div>
      {showLearnMore && (
        <Link
          to="/about"
          className="block mt-6 text-pandaria-primary hover:text-pandaria-secondary dark:hover:text-pandaria-accent text-sm font-medium"
        >
          Learn more about our shenanigans →
        </Link>
      )}
    </Card>
  )
}

export default GuildStatsCard 