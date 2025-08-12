// Theme Enums
export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

// WoW Class Enums
export enum WowClass {
  DeathKnight = 'Death Knight',
  DemonHunter = 'Demon Hunter',
  Druid = 'Druid',
  Evoker = 'Evoker',
  Hunter = 'Hunter',
  Mage = 'Mage',
  Monk = 'Monk',
  Paladin = 'Paladin',
  Priest = 'Priest',
  Rogue = 'Rogue',
  Shaman = 'Shaman',
  Warlock = 'Warlock',
  Warrior = 'Warrior',
}

// Guild Member Role Enums
export enum MemberRole {
  Tank = 'Tank',
  Healer = 'Healer',
  DPS = 'DPS',
  Feeder = 'Feeder',
  Officer = 'Officer',
  Member = 'Member',
}

// WoW Faction Enums
export enum WowFaction {
  Horde = 'Horde',
  Alliance = 'Alliance',
}

// Log Type Enums
export enum LogType {
  Kills = 'kills',
  Wipes = 'wipes',
  Encounters = 'encounters',
  Trash = 'trash',
}

// Difficulty Enums
export enum RaidDifficulty {
  Normal = 'NORMAL',
  Heroic = 'HEROIC',
  Mythic = 'MYTHIC',
  LFR = 'LFR',
}

// Color Quality Enums
export enum ItemQuality {
  Poor = 'poor',
  Common = 'common',
  Uncommon = 'uncommon',
  Rare = 'rare',
  Epic = 'epic',
  Legendary = 'legendary',
} 

// Equipment slots from Blizzard WoW API (slot.type)
export enum EquipmentSlot {
  HEAD = 'HEAD',
  NECK = 'NECK',
  SHOULDER = 'SHOULDER',
  BACK = 'BACK',
  CHEST = 'CHEST',
  WRIST = 'WRIST',
  HANDS = 'HANDS',
  WAIST = 'WAIST',
  LEGS = 'LEGS',
  FEET = 'FEET',
  FINGER_1 = 'FINGER_1',
  FINGER_2 = 'FINGER_2',
  TRINKET_1 = 'TRINKET_1',
  TRINKET_2 = 'TRINKET_2',
  MAIN_HAND = 'MAIN_HAND',
  OFF_HAND = 'OFF_HAND',
}

// Media asset keys used in Blizzard Media API responses
export enum MediaAssetKey {
  Avatar = 'avatar',
  Icon = 'icon',
}