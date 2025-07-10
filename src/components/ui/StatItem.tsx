import type { StatItemProps } from '../../shared/types'

const StatItem = ({ label, value, className = '' }: StatItemProps) => {
  return (
    <div className={`flex justify-between ${className}`}>
      <span className="text-pandaria-dark/70 dark:text-pandaria-light/70">
        {label}:
      </span>
      <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
        {value}
      </span>
    </div>
  )
}

export default StatItem 