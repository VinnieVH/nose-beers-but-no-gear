export const getClassColor = (className: string) => {
  const classColors = {
    Monk: 'bg-pandaria-primary',
    Warrior: 'bg-pandaria-secondary',
    Paladin: 'bg-pandaria-accent',
    Hunter: 'bg-pandaria-primaryDark',
    Rogue: 'bg-pandaria-accentDark',
    Priest: 'bg-white dark:bg-gray-200',
    Shaman: 'bg-pandaria-primary',
    Mage: 'bg-pandaria-primaryLight',
    Warlock: 'bg-pandaria-secondaryLight',
    Druid: 'bg-pandaria-accentLight',
    'Death Knight': 'bg-pandaria-secondaryDark',
  }
  return classColors[className as keyof typeof classColors] || 'bg-gray-500'
}

export const getClassBadgeColor = (className: string) => {
  const classBadgeColors = {
    Monk: 'bg-pandaria-primary/30 text-pandaria-primaryDark dark:bg-pandaria-primary/30 dark:text-pandaria-primaryLight',
    Warrior: 'bg-pandaria-secondary/30 text-pandaria-secondaryDark dark:bg-pandaria-secondary/30 dark:text-pandaria-secondaryLight',
    Paladin: 'bg-pandaria-accent/30 text-pandaria-dark dark:bg-pandaria-accent/30 dark:text-pandaria-accent',
    Hunter: 'bg-pandaria-primaryDark/30 text-pandaria-primaryDark dark:bg-pandaria-primaryDark/30 dark:text-pandaria-primary',
    Rogue: 'bg-pandaria-accentDark/30 text-pandaria-accentDark dark:bg-pandaria-accentDark/30 dark:text-pandaria-accent',
    Priest: 'bg-gray-200/50 text-gray-700 dark:bg-gray-200/30 dark:text-gray-200',
    Shaman: 'bg-pandaria-primary/30 text-pandaria-primaryDark dark:bg-pandaria-primary/30 dark:text-pandaria-primaryLight',
    Mage: 'bg-pandaria-primaryLight/30 text-pandaria-primary dark:bg-pandaria-primaryLight/30 dark:text-pandaria-primaryLight',
    Warlock: 'bg-pandaria-secondaryLight/30 text-pandaria-secondary dark:bg-pandaria-secondaryLight/30 dark:text-pandaria-secondaryLight',
    Druid: 'bg-pandaria-accentLight/30 text-pandaria-accent dark:bg-pandaria-accentLight/30 dark:text-pandaria-accentLight',
    'Death Knight': 'bg-pandaria-secondaryDark/30 text-pandaria-secondaryDark dark:bg-pandaria-secondaryDark/30 dark:text-pandaria-secondary',
  }
  return classBadgeColors[className as keyof typeof classBadgeColors] || 'bg-gray-200/50 text-gray-700 dark:bg-gray-200/30 dark:text-gray-200'
}

export const getPerformanceColor = (percentage: number) => {
  if (percentage >= 95) return 'bg-pandaria-accent dark:bg-pandaria-accentLight' // Legendary
  if (percentage >= 75) return 'bg-pandaria-primary dark:bg-pandaria-primaryLight' // Epic
  if (percentage >= 50) return 'bg-pandaria-primaryDark dark:bg-pandaria-primary' // Rare
  if (percentage >= 25) return 'bg-pandaria-accentDark dark:bg-pandaria-accentLight' // Uncommon
  return 'bg-pandaria-secondary dark:bg-pandaria-secondaryLight' // Common
} 