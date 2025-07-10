export const getClassColor = (className: string) => {
  const classColors = {
    'Death Knight': 'bg-[var(--color-class-death-knight)]',
    'Demon Hunter': 'bg-[var(--color-class-demon-hunter)]',
    Druid: 'bg-[var(--color-class-druid)]',
    Evoker: 'bg-[var(--color-class-evoker)]',
    Hunter: 'bg-[var(--color-class-hunter)]',
    Mage: 'bg-[var(--color-class-mage)]',
    Monk: 'bg-[var(--color-class-monk)]',
    Paladin: 'bg-[var(--color-class-paladin)]',
    Priest: 'bg-[var(--color-class-priest)]',
    Rogue: 'bg-[var(--color-class-rogue)]',
    Shaman: 'bg-[var(--color-class-shaman)]',
    Warlock: 'bg-[var(--color-class-warlock)]',
    Warrior: 'bg-[var(--color-class-warrior)]',
  }
  return classColors[className as keyof typeof classColors] || 'bg-gray-500'
}

export const getClassBadgeColor = (className: string) => {
  const classBadgeColors = {
    'Death Knight': 'bg-[var(--color-class-death-knight)]/30 text-[var(--color-class-death-knight)] dark:bg-[var(--color-class-death-knight)]/20 dark:text-[var(--color-class-death-knight)]',
    'Demon Hunter': 'bg-[var(--color-class-demon-hunter)]/30 text-[var(--color-class-demon-hunter)] dark:bg-[var(--color-class-demon-hunter)]/20 dark:text-[var(--color-class-demon-hunter)]',
    Druid: 'bg-[var(--color-class-druid)]/30 text-[var(--color-class-druid)] dark:bg-[var(--color-class-druid)]/20 dark:text-[var(--color-class-druid)]',
    Evoker: 'bg-[var(--color-class-evoker)]/30 text-[var(--color-class-evoker)] dark:bg-[var(--color-class-evoker)]/20 dark:text-[var(--color-class-evoker)]',
    Hunter: 'bg-[var(--color-class-hunter)]/30 text-[var(--color-class-hunter)] dark:bg-[var(--color-class-hunter)]/20 dark:text-[var(--color-class-hunter)]',
    Mage: 'bg-[var(--color-class-mage)]/30 text-[var(--color-class-mage)] dark:bg-[var(--color-class-mage)]/20 dark:text-[var(--color-class-mage)]',
    Monk: 'bg-[var(--color-class-monk)]/30 text-[var(--color-class-monk)] dark:bg-[var(--color-class-monk)]/20 dark:text-[var(--color-class-monk)]',
    Paladin: 'bg-[var(--color-class-paladin)]/30 text-[var(--color-class-paladin)] dark:bg-[var(--color-class-paladin)]/20 dark:text-[var(--color-class-paladin)]',
    Priest: 'bg-[var(--color-class-priest)]/30 text-gray-700 dark:bg-[var(--color-class-priest)]/20 dark:text-[var(--color-class-priest)]',
    Rogue: 'bg-[var(--color-class-rogue)]/30 text-[var(--color-class-rogue)] dark:bg-[var(--color-class-rogue)]/20 dark:text-[var(--color-class-rogue)]',
    Shaman: 'bg-[var(--color-class-shaman)]/30 text-[var(--color-class-shaman)] dark:bg-[var(--color-class-shaman)]/20 dark:text-[var(--color-class-shaman)]',
    Warlock: 'bg-[var(--color-class-warlock)]/30 text-[var(--color-class-warlock)] dark:bg-[var(--color-class-warlock)]/20 dark:text-[var(--color-class-warlock)]',
    Warrior: 'bg-[var(--color-class-warrior)]/30 text-[var(--color-class-warrior)] dark:bg-[var(--color-class-warrior)]/20 dark:text-[var(--color-class-warrior)]',
  }
  return classBadgeColors[className as keyof typeof classBadgeColors] || 'bg-gray-200/50 text-gray-700 dark:bg-gray-200/30 dark:text-gray-200'
}

export const getPerformanceColor = (percentage: number) => {
  if (percentage >= 95) return 'bg-[var(--color-quality-legendary)]' // Legendary
  if (percentage >= 75) return 'bg-[var(--color-quality-epic)]' // Epic
  if (percentage >= 50) return 'bg-[var(--color-quality-rare)]' // Rare
  if (percentage >= 25) return 'bg-[var(--color-quality-uncommon)]' // Uncommon
  return 'bg-[var(--color-quality-poor)]' // Poor
} 