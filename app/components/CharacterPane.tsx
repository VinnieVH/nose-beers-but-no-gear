"use client";
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import type { WowItemMedia } from '@/app/shared/types';
import { EquipmentSlot } from '@/app/shared/enums';
import type { EquippedItem } from '@/app/lib/types';

interface CharacterPaneProps {
  items: EquippedItem[];
  mediaByItemMediaId: Map<number, WowItemMedia | null>;
  characterName: string;
}

interface SlotGroup {
  title: string;
  order: EquipmentSlot[];
}

const LEFT_GROUP: SlotGroup = {
  title: 'Left',
  order: [
    EquipmentSlot.HEAD,
    EquipmentSlot.NECK,
    EquipmentSlot.SHOULDER,
    EquipmentSlot.BACK,
    EquipmentSlot.CHEST,
    EquipmentSlot.WRIST,
  ],
};

const RIGHT_GROUP: SlotGroup = {
  title: 'Right',
  order: [
    EquipmentSlot.HANDS,
    EquipmentSlot.WAIST,
    EquipmentSlot.LEGS,
    EquipmentSlot.FEET,
    EquipmentSlot.FINGER_1,
    EquipmentSlot.FINGER_2,
    EquipmentSlot.TRINKET_1,
    EquipmentSlot.TRINKET_2,
  ],
};

const MIDDLE_BOTTOM: SlotGroup = {
  title: 'Bottom',
  order: [EquipmentSlot.MAIN_HAND, EquipmentSlot.OFF_HAND],
};

function getIconUrl(media: WowItemMedia | null | undefined): string {
  if (!media) return '';
  const iconAsset = media.assets.find((a) => a.key === 'icon');
  return iconAsset?.value ?? media.assets[0]?.value ?? '';
}

interface TooltipPosition {
  x: number;
  y: number;
}

const CharacterPaneItem = ({ item, media }: { item: EquippedItem; media: WowItemMedia | null }): React.JSX.Element => {
  const iconUrl = getIconUrl(media);
  const qualityClass = `text-quality-${item.quality.type.toLowerCase()}`;
  const enchantments = item.enchantments ?? [];
  const stats = item.stats ?? [];
  const hasDetails = enchantments.length > 0 || stats.length > 0;

  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });

  const handleMouseEnter = useCallback((): void => {
    setIsTooltipVisible(true);
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
    setTooltipPosition({ x: event.clientX + 12, y: event.clientY + 12 });
  }, []);

  const handleMouseLeave = useCallback((): void => {
    setIsTooltipVisible(false);
  }, []);

  return (
    <div className="relative character-pane__item flex w-full items-center gap-2 md:gap-2 lg:gap-3 overflow-hidden rounded border border-pandaria-primary/20 dark:border-pandaria-primary/30 bg-white/80 dark:bg-pandaria-dark/40 p-1 md:p-1 lg:p-2 shadow-sm">
      <div
        className="relative shrink-0"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {iconUrl ? (
          <Image src={iconUrl} alt={item.name} width={36} height={36} className="h-8 w-8 md:h-8 md:w-8 lg:h-9 lg:w-9 rounded object-contain" />
        ) : (
          <div className="h-8 w-8 md:h-8 md:w-8 lg:h-9 lg:w-9 rounded bg-pandaria-primary/10" />)
        }
      </div>
      <div className="min-w-0 flex-1 block">
        <div className={`truncate text-xs md:text-xs lg:text-sm leading-tight font-semibold ${qualityClass}`}>{item.name}</div>
      </div>

      {isTooltipVisible && (
        <div
          className="pointer-events-none fixed z-50 w-80 rounded-md border border-pandaria-primary/30 bg-pandaria-dark/95 p-3 text-[13px] text-white shadow-2xl"
          style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }}
        >
          <div className={`mb-1 text-base font-semibold ${qualityClass}`}>{item.name}</div>
          <div className="mb-2 text-pandaria-accent">{item.slot.name}</div>
          {hasDetails ? (
            <div className="space-y-2">
              {enchantments.length > 0 && (
                <div>
                  {enchantments.map((ench, idx) => (
                    <div key={`ench-${idx}`} className="text-pandaria-primary-light">{ench.display_string}</div>
                  ))}
                </div>
              )}
              {stats.length > 0 && (
                <div>
                  {stats.map((stat, idx) => (
                    <div key={`stat-${idx}`} className="text-green-400">{stat.display.display_string}</div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-pandaria-secondary/70">No additional details</div>
          )}
        </div>
      )}
    </div>
  );
};

const CharacterPane = ({ items, mediaByItemMediaId }: CharacterPaneProps): React.JSX.Element => {
  const itemsBySlot: Partial<Record<EquipmentSlot, EquippedItem>> = {};
  for (const item of items) {
    const slotValue = item.slot.type as EquipmentSlot;
    itemsBySlot[slotValue] = item;
  }

  const resolveItemsForGroup = (group: SlotGroup): EquippedItem[] => {
    return group.order
      .map((slot) => itemsBySlot[slot])
      .filter((i): i is EquippedItem => Boolean(i));
  };

  const renderItem = (item: EquippedItem): React.JSX.Element => (
    <CharacterPaneItem key={item.item.id} item={item} media={mediaByItemMediaId.get(item.media.id) ?? null} />
  );

  const renderGroup = (group: SlotGroup): React.JSX.Element => {
    const groupItems = resolveItemsForGroup(group);
    return (
      <div className="character-pane__column flex flex-col gap-1 md:gap-1.5 lg:gap-2">
        {groupItems.map(renderItem)}
      </div>
    );
  };

  return (
    <div className="character-pane rounded-xl border border-pandaria-primary/20 dark:border-pandaria-primary/30 bg-pandaria-paper/70 dark:bg-pandaria-primary/10 p-4 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(160px,220px)_minmax(320px,480px)_minmax(160px,220px)] lg:grid-cols-[minmax(180px,260px)_minmax(380px,560px)_minmax(180px,260px)] items-stretch justify-center gap-4">
        {renderGroup(LEFT_GROUP)}
        <div className="character-pane__preview relative min-h-[380px] h-full rounded-lg border border-pandaria-primary/20 dark:border-pandaria-primary/30 bg-pandaria-light/70 dark:bg-pandaria-dark/40 flex items-center justify-center">
          <div className="text-center p-4">
            <Image
              src="/images/wipe-inc.jpg"
              alt="Character preview placeholder"
              width={360}
              height={360}
              className="w-[280px] md:w-[320px] lg:w-[360px] h-auto object-contain rounded-md opacity-80 shadow"
            />
          </div>
          <div className="character-pane__bottom absolute right-3 left-3 bottom-3 flex items-stretch justify-center gap-3">
            {resolveItemsForGroup(MIDDLE_BOTTOM).map(renderItem)}
          </div>
        </div>
        {renderGroup(RIGHT_GROUP)}
      </div>
    </div>
  );
};

export default CharacterPane;


