import React from 'react'
import Image from 'next/image'
import { getClassIconUrl, getItemLevelBadgeClasses } from '@/app/lib/utils'
import type { WowClass } from '@/app/shared/enums'

interface CharacterHeaderProps {
  characterName: string
  avatarUrl: string
  subtitle: string
  wowClass: WowClass
  itemLevel: number | null
}

const CharacterHeader = ({ characterName, avatarUrl, subtitle, wowClass, itemLevel }: CharacterHeaderProps): React.JSX.Element => {
  return (
    <section className="character-header rounded-xl border border-pandaria-primary/20 dark:border-pandaria-primary/30 bg-white/80 dark:bg-pandaria-dark/40 shadow-md">
      <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6">
        <div className="character-header__avatar relative h-16 w-16 md:h-24 md:w-24 shrink-0 overflow-hidden border-2 border-pandaria-accent/70 shadow">
          <Image
            src={avatarUrl}
            alt={`${characterName} avatar`}
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
          {wowClass && (
            <div className="absolute bottom-0 left">
              <Image
                src={getClassIconUrl(wowClass)}
                alt={wowClass}
                width={32}
                height={32}
                className="w-6 h-6 md:w-8 md:h-8 rounded border border-pandaria-accent/70 dark:border-pandaria-accent/50"
              />
            </div>
          )}
        </div>
        <div className="character-header__text min-w-0 flex-1">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight truncate">
            {characterName}
          </h1>
          <p className="text-pandaria-secondary dark:text-pandaria-accent mt-1 md:mt-2 text-sm md:text-base">
            {subtitle}
          </p>
        </div>  
        {Number.isFinite(itemLevel) && itemLevel !== null && (
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full border text-sm md:text-base font-semibold ${getItemLevelBadgeClasses(itemLevel)}`}>
              ilvl {Math.round(itemLevel)}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

export default CharacterHeader


