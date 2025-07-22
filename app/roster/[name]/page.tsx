import { getBaseUrl } from '@/app/lib/utils';
import React from 'react';
import ItemCard from '@/app/components/ItemCard';
import type { WowItemMedia } from '@/app/shared/types';

// --- Types ---
export interface EquippedItem {
  item: { id: number };
  name: string;
  slot: { type: string; name: string };
  quality: { type: string; name: string };
  media: { id: number };
  enchantments?: Array<{
    display_string: string;
  }>;
  stats?: Array<{
    type: { type: string; name: string };
    value: number;
    display: { display_string: string };
  }>;
}

interface CharacterEquipmentResponse {
  character: {
    name: string;
    realm: { name: string; slug: string };
  };
  equipped_items: EquippedItem[];
}

// --- Helper to fetch equipment ---
async function getCharacterEquipment(name: string): Promise<CharacterEquipmentResponse> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blizzard/equipment?name=${encodeURIComponent(name)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch character equipment');
  return res.json();
}

async function getItemMedia(itemId: number): Promise<WowItemMedia> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blizzard/item-media?itemId=${itemId}`);
  if (!res.ok) throw new Error('Failed to fetch item media');
  return res.json();
} 

const CharacterEquipmentPage = async ({ params }: { params: Promise<{ name: string }> }): Promise<React.JSX.Element> => {
  let equipment: CharacterEquipmentResponse | null = null;
  let error: string | null = null;
  let itemMediaList: (WowItemMedia | null)[] = [];
  const {name} = await params;
  try {
    equipment = await getCharacterEquipment(name);

    if (equipment) {
      itemMediaList = await Promise.all(
        equipment.equipped_items.map(item =>
          getItemMedia(item.media.id).catch(() => null)
        )
      );
    }
  } catch (e) {
    error = (e as Error).message;
  }

  return (
    <div className="character-equipment-page">
      <h1 className="text-2xl font-bold mb-4">{name}&apos;s Equipped Items</h1>
      {error && <div className="text-red-500">{error}</div>}
      {!equipment ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {equipment.equipped_items.map((item, idx) => (
            <ItemCard key={item.item.id} item={item} media={itemMediaList[idx]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterEquipmentPage; 