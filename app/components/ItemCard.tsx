import React from 'react';
import Image from 'next/image';
import type { EquippedItem } from '../roster/[name]/page';
import type { WowItemMedia } from '../shared/types';

interface ItemCardProps {
  item: EquippedItem;
  media: WowItemMedia | null;
}

const ItemCard = ({ item, media }: ItemCardProps): React.JSX.Element => {
  const imageUrl = media?.assets.find((a: { key: string }) => a.key === 'icon')?.value || media?.assets[0]?.value || '';
  
  return (
    <div className={`text-quality-${item.quality.type.toLowerCase()} p-3 rounded-lg shadow border flex items-center gap-3 bg-white dark:bg-pandaria-dark/40`}>
      {imageUrl && (
        <div className="relative group">
          <Image
            src={imageUrl}
            alt={item.name}
            width={48}
            height={48}
            className="w-12 h-12 object-contain rounded"
          />
          {(item.stats || (item.enchantments && item.enchantments.length > 0)) && (
            <div className="absolute left-0 top-full mt-2 w-64 z-20 rounded-md border bg-white/95 dark:bg-pandaria-dark/95 p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
              {item.enchantments && item.enchantments.length > 0 && (
                <div className="mb-2">
                  <div className="font-semibold text-xs">Enchantments</div>
                  <ul className="list-disc ml-4">
                    {item.enchantments.map((ench: { display_string: string }, i: number) => (
                      <li key={`ench-${i}`} className="text-xs">{ench.display_string}</li>
                    ))}
                  </ul>
                </div>
              )}
              {item.stats && item.stats.length > 0 && (
                <div>
                  <div className="font-semibold text-xs">Stats</div>
                  <ul className="list-disc ml-4">
                    {item.stats.map((stat: { display: { display_string: string } }, i: number) => (
                      <li key={`stat-${i}`} className="text-xs">{stat.display.display_string}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{item.name}</div>
        <div className="text-[11px] text-quality/80 truncate">{item.slot.name} • {item.quality.name}</div>
      </div>
    </div>
  );
};

export default ItemCard; 