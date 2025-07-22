import React from 'react';
import Image from 'next/image';
import type { EquippedItem } from '../roster/[name]/page';
import type { WowItemMedia } from '../shared/types';

interface ItemCardProps {
  item: EquippedItem;
  media: WowItemMedia | null;
}

const ItemCard = ({ item, media }: ItemCardProps): React.JSX.Element => {
  // Find the asset with key 'icon' or fallback to the first asset
  const imageUrl = media?.assets.find((a: { key: string }) => a.key === 'icon')?.value || media?.assets[0]?.value || '';

  return (
    <div className={`equipment-card equipment-card--${item.quality.type.toLowerCase()} p-4 rounded-lg shadow border flex flex-col gap-2`}>
      <div className="font-semibold text-lg">{item.name}</div>
      <div className="text-xs text-pandaria-secondary">{item.slot.name}</div>
      <div className="text-xs text-pandaria-secondary">Quality: {item.quality.name}</div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={item.name}
          width={64}
          height={64}
          className="w-16 h-16 object-contain rounded"
        />
      )}
      {item.enchantments && item.enchantments.length > 0 && (
        <div className="mt-2">
          <div className="font-semibold text-xs">Enchantments:</div>
          <ul className="list-disc ml-4">
            {item.enchantments.map((ench: { display_string: string }, i: number) => (
              <li key={i} className="text-xs">{ench.display_string}</li>
            ))}
          </ul>
        </div>
      )}
      {item.stats && item.stats.length > 0 && (
        <div className="mt-2">
          <div className="font-semibold text-xs">Stats:</div>
          <ul className="list-disc ml-4">
            {item.stats.map((stat: { display: { display_string: string } }, i: number) => (
              <li key={i} className="text-xs">{stat.display.display_string}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemCard; 