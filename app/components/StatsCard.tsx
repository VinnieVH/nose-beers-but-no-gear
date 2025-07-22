import React from 'react'

export interface StatsCardProps {
  value: React.ReactNode
  label: string
  className?: string
}

const StatsCard = ({ value, label, className = '' }: StatsCardProps): React.JSX.Element => (
  <div className={`bg-white dark:bg-pandaria-dark rounded-lg p-4 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300 ${className}`}>
    <div className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent">
      {value}
    </div>
    <div className="text-sm text-pandaria-dark/70 dark:text-pandaria-light/70">
      {label}
    </div>
  </div>
)

export default StatsCard 