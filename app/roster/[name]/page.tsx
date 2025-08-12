import { getBaseUrl, toWowClass } from '@/app/lib/utils';
import React from 'react';
import CharacterPane from '@/app/components/CharacterPane';
import CharacterHeader from '@/app/components/CharacterHeader';
import type { WowCharacterProfile, WowItemMedia } from '@/app/shared/types';
import { EquipmentSlot } from '@/app/shared/enums';
import { CharacterEquipmentResponse, EquippedItem } from '@/app/lib/types';
import Link from 'next/link';
import type { WowClass } from '@/app/shared/enums';

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

async function getCharacterAvatar(name: string): Promise<string | null> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blizzard/avatar?name=${encodeURIComponent(name)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  interface AvatarResponse { avatarUrl?: string | null }
  const data: AvatarResponse = await res.json();
  return data && typeof data.avatarUrl === 'string' ? data.avatarUrl : null;
}

async function getCharacterProfile(name: string): Promise<WowCharacterProfile> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blizzard/character-profile?name=${encodeURIComponent(name)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch character profile');
  return res.json();
}

// Guard: ensure arbitrary string is a known EquipmentSlot
function isEquipmentSlot(value: string): value is EquipmentSlot {
  const valid = new Set<string>(Object.values(EquipmentSlot));
  return valid.has(value);
}

const CharacterEquipmentPage = async (
  { params }: { params: Promise<{ name: string }> }
): Promise<React.JSX.Element> => {
  let equipment: CharacterEquipmentResponse | null = null;
  let error: string | null = null;
  let itemMediaList: (WowItemMedia | null)[] = [];
  let wowClass: WowClass | null = null;
  let itemLevel: number | null = null;
  const { name } = await params;
  let avatarUrl: string | null = null;
  try {
    // Fetch equipment and profile concurrently
    const [equip, profile] = await Promise.all([
      getCharacterEquipment(name),
      getCharacterProfile(name),
    ]);
    equipment = equip;
    wowClass = toWowClass(profile?.character_class?.name ?? '');
    itemLevel = profile?.average_item_level ?? null;


    if (equipment) {
      ;[itemMediaList, avatarUrl] = await Promise.all([
        Promise.all(
          equipment.equipped_items.map((item) =>
            getItemMedia(item.media.id).catch(() => null)
          )
        ),
        getCharacterAvatar(equipment.character.name).catch(() => null),
      ]);
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

  const itemsBySlot: Partial<Record<EquipmentSlot, EquippedItem>> = {};
  if (equipment) {
    for (const item of equipment.equipped_items) {
      const slotType = item.slot.type;
      if (typeof slotType === 'string' && isEquipmentSlot(slotType)) {
        itemsBySlot[slotType] = item;
      }
    }
  }

  return (
    <div className="character-equipment-page container mx-auto px-4 py-6">
      <div className="mb-2">
        <Link href="/roster" className="text-sm text-pandaria-secondary hover:underline dark:text-pandaria-accent">
          ← Back to roster
        </Link>
      </div>
      {wowClass && (
      <div className="mb-6">
        <CharacterHeader
          characterName={equipment?.character.name ?? name}
          avatarUrl={avatarUrl ?? '/dd/images/wipe-inc.jpg'}
          subtitle="Equipped Items"
          wowClass={wowClass}
          itemLevel={itemLevel}
        />
      </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {!equipment ? (
        <div className="rounded-xl border border-pandaria-primary/20 dark:border-pandaria-primary/30 bg-white/80 dark:bg-pandaria-dark/40 p-6">
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-6 w-full animate-pulse rounded bg-pandaria-primary/10 dark:bg-pandaria-primary/20" />
            ))}
          </div>
        </div>
      ) : (
        <CharacterPane
          items={equipment.equipped_items}
          mediaByItemMediaId={mediaByItemMediaId}
          characterName={equipment.character.name}
        />
      )}
    </div>
  );
};

export default CharacterEquipmentPage;