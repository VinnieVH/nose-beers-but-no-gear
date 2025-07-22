import React from 'react';
import type { RaidHelperEvent } from '../lib/types';
import { CalendarIcon, UserIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import { formatDateTime, getColorAccent } from '../lib/utils'

export interface RaidEventCardProps {
  event: RaidHelperEvent;
}

const RaidEventCard = ({ event }: RaidEventCardProps): React.JSX.Element => {
  const imageUrl = typeof event.imageUrl === 'string' ? event.imageUrl : undefined;
  const leaderName = typeof event.leaderName === 'string' ? event.leaderName : undefined;
  const signUpCount = typeof event.signUpCount === 'string' || typeof event.signUpCount === 'number' ? String(event.signUpCount) : undefined;
  const color = typeof event.color === 'string' ? event.color : undefined;
  const title = typeof event.title === 'string' ? event.title : event.name;

  return (
    <div
      className="raid-event-card flex flex-col md:flex-row md:items-center gap-3 rounded-lg border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-sm p-0 overflow-hidden bg-pandaria-paper dark:bg-pandaria-primary/10 transition-colors duration-300 hover:shadow-md"
      style={{ borderLeft: `4px solid ${getColorAccent(color)}` }}
    >
      {imageUrl && (
        <div className="flex-shrink-0 w-full md:w-24 h-20 md:h-20 relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover w-full h-full rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            style={{ minWidth: '96px', maxHeight: '80px' }}
            sizes="96px"
          />
        </div>
      )}
      <div className="flex-1 p-3 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-pandaria-secondary dark:text-pandaria-accent" />
          <span className="text-sm font-semibold text-pandaria-secondary dark:text-pandaria-accent">
            {title}
          </span>
        </div>
        {event.description && typeof event.description === 'string' && event.description.trim() !== '' && (
          <div className="text-pandaria-dark/80 dark:text-pandaria-light/80 text-xs">
            {event.description}
          </div>
        )}
        <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-xs">
          {formatDateTime(event.startTime)}
          {event.endTime ? ` - ${formatDateTime(event.endTime)}` : ''}
        </div>
        <div className="flex flex-wrap gap-3 mt-1 text-xs">
          {leaderName && (
            <span className="flex items-center gap-1 text-pandaria-primary dark:text-pandaria-primaryLight">
              <UserIcon className="h-4 w-4" /> Leader: {leaderName}
            </span>
          )}
          {signUpCount && (
            <span className="flex items-center gap-1 text-pandaria-primary dark:text-pandaria-primaryLight">
              <UsersIcon className="h-4 w-4" /> Sign-ups: {signUpCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaidEventCard; 