import { getBaseUrl } from '@/app/lib/utils';
import React from 'react';
import CharacterPane from '@/app/components/CharacterPane';
import CharacterHeader from '@/app/components/CharacterHeader';
import type { WowItemMedia } from '@/app/shared/types';
import { EquipmentSlot } from '@/app/shared/enums';
import { CharacterEquipmentResponse, EquippedItem } from '@/app/lib/types';
import Link from 'next/link';
import { toWowClass } from '@/app/lib/utils';
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
  const data = (await res.json()) as { avatarUrl?: string | null };
  return data?.avatarUrl ?? null;
}

// Guard: ensure arbitrary string is a known EquipmentSlot
function isEquipmentSlot(value: string): value is EquipmentSlot {
  const valid = new Set<string>(Object.values(EquipmentSlot));
  return valid.has(value);
}

const CharacterEquipmentPage = async (
  { params, searchParams }: { params: Promise<{ name: string }>; searchParams?: Promise<{ race?: string; class?: string }> }
): Promise<React.JSX.Element> => {
  let equipment: CharacterEquipmentResponse | null = null;
  let error: string | null = null;
  let itemMediaList: (WowItemMedia | null)[] = [];
  let passedRace: string | null = null;
  let passedClass: WowClass | null = null;
  const { name } = await params;
  if (searchParams) {
    const sp = await searchParams;
    if (sp?.race && sp?.class) {
      passedRace = sp.race;
      passedClass = toWowClass(sp.class);
    }
  }
  let avatarUrl: string | null = null;
  try {
    equipment = await getCharacterEquipment(name);

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
      {passedClass && (
      <div className="mb-6">
        <CharacterHeader
          characterName={equipment?.character.name ?? name}
          avatarUrl={avatarUrl ?? '/dd/images/wipe-inc.jpg'}
          subtitle="Equipped Items"
          wowClass={passedClass}
        />
      </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {!equipment ? (
        <div>Loading...</div>
      ) : passedRace ? (
        <CharacterPane
          items={equipment.equipped_items}
          mediaByItemMediaId={mediaByItemMediaId}
          characterName={equipment.character.name}
        />
      ) : (
        <div>No race or class passed</div>
      )}
    </div>
  );
};

export default CharacterEquipmentPage;