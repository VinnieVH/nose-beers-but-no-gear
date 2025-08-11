import { getBaseUrl } from '@/app/lib/utils';
import React from 'react';
import ItemCard from '@/app/components/ItemCard';
import type { WowItemMedia } from '@/app/shared/types';
import { EquipmentSlot } from '@/app/shared/enums';

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

// Guard: ensure arbitrary string is a known EquipmentSlot
function isEquipmentSlot(value: string): value is EquipmentSlot {
  const valid = new Set<string>(Object.values(EquipmentSlot));
  return valid.has(value);
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

  // Precompute media lookup to avoid passing by index
  const mediaByItemMediaId: Map<number, WowItemMedia | null> = new Map<number, WowItemMedia | null>();
  if (equipment) {
    for (let i = 0; i < equipment.equipped_items.length; i += 1) {
      const equipped = equipment.equipped_items[i];
      mediaByItemMediaId.set(equipped.media.id, itemMediaList[i] || null);
    }
  }

  // Group items by slot for a left/center/right layout
  const leftOrder: EquipmentSlot[] = [
    EquipmentSlot.HEAD,
    EquipmentSlot.NECK,
    EquipmentSlot.SHOULDER,
    EquipmentSlot.BACK,
    EquipmentSlot.CHEST,
    EquipmentSlot.WRIST,
    EquipmentSlot.WAIST,
    EquipmentSlot.LEGS,
    EquipmentSlot.FEET,
  ];

  const rightOrder: EquipmentSlot[] = [
    EquipmentSlot.HANDS,
    EquipmentSlot.FINGER_1,
    EquipmentSlot.FINGER_2,
    EquipmentSlot.TRINKET_1,
    EquipmentSlot.TRINKET_2,
    EquipmentSlot.MAIN_HAND,
    EquipmentSlot.OFF_HAND,
  ];

  const itemsBySlot: Partial<Record<EquipmentSlot, EquippedItem>> = {};
  if (equipment) {
    for (const item of equipment.equipped_items) {
      const slotType = item.slot.type;
      if (typeof slotType === 'string' && isEquipmentSlot(slotType)) {
        itemsBySlot[slotType] = item;
      }
    }
  }

  const leftItems: EquippedItem[] = leftOrder
    .map((slot) => itemsBySlot[slot])
    .filter((i): i is EquippedItem => Boolean(i));

  const rightItems: EquippedItem[] = rightOrder
    .map((slot) => itemsBySlot[slot])
    .filter((i): i is EquippedItem => Boolean(i));

  const renderItemCard = (item: EquippedItem): React.JSX.Element => (
    <ItemCard key={item.item.id} item={item} media={mediaByItemMediaId.get(item.media.id) ?? null} />
  );

  return (
    <div className="character-equipment-page">
      <h1 className="text-2xl font-bold mb-4">{name}&apos;s Equipped Items</h1>
      {error && <div className="text-red-500">{error}</div>}
      {!equipment ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(260px,420px)_1fr] gap-6 items-start">
          <div className="flex flex-col gap-3">
            {leftItems.map(renderItemCard)}
          </div>
          <div className="min-h-[360px] flex items-center justify-center rounded-lg border border-pandaria-primary/20 dark:border-pandaria-primary/30 bg-pandaria-paper dark:bg-pandaria-primary/10 shadow-sm">
            <div className="text-center p-6">
              <div className="text-xl font-semibold">{equipment.character.name}</div>
              <div className="text-xs text-pandaria-secondary/70">Character Preview</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {rightItems.map(renderItemCard)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterEquipmentPage; 