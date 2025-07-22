import React from 'react';
import type { RaidHelperEvent } from '../lib/types';
import { CalendarIcon, UserIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';

export interface RaidEventCardProps {
  event: RaidHelperEvent;
}

const formatDateTime = (timestamp?: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('nl-BE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const getColorAccent = (color?: string): string => {
  if (!color) return 'rgba(76,175,80,0.5)';
  return `rgba(${color},0.5)`;
};

const RaidEventCard = ({ event }: RaidEventCardProps): React.JSX.Element => {
  const imageUrl = typeof event.imageUrl === 'string' ? event.imageUrl : undefined;
  const leaderName = typeof event.leaderName === 'string' ? event.leaderName : undefined;
  const signUpCount = typeof event.signUpCount === 'string' || typeof event.signUpCount === 'number' ? String(event.signUpCount) : undefined;
  const color = typeof event.color === 'string' ? event.color : undefined;
  const title = typeof event.title === 'string' ? event.title : event.name;

  return (
    <div
      className="raid-event-card flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-md p-0 overflow-hidden bg-pandaria-paper dark:bg-pandaria-primary/10 transition-colors duration-300 hover:shadow-lg"
      style={{ borderLeft: `8px solid ${getColorAccent(color)}` }}
    >
      {imageUrl && (
        <div className="flex-shrink-0 w-full md:w-40 h-32 md:h-32 relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover w-full h-full rounded-t-xl md:rounded-t-none md:rounded-l-xl"
            style={{ minWidth: '100px', maxHeight: '128px' }}
            sizes="160px"
          />
        </div>
      )}
      <div className="flex-1 p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-pandaria-secondary dark:text-pandaria-accent" />
          <span className="text-lg font-bold text-pandaria-secondary dark:text-pandaria-accent">
            {title}
          </span>
        </div>
        {event.description && typeof event.description === 'string' && event.description.trim() !== '' && (
          <div className="text-pandaria-dark/80 dark:text-pandaria-light/80 text-sm mb-1">
            {event.description}
          </div>
        )}
        <div className="text-pandaria-dark/70 dark:text-pandaria-light/70 text-xs">
          {formatDateTime(event.startTime)}
          {event.endTime ? ` - ${formatDateTime(event.endTime)}` : ''}
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-xs">
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