import React from 'react'
interface StatItemProps {
  label: string
  value: string | number
  className?: string
}

const StatItem = ({ label, value, className = '' }: StatItemProps): React.JSX.Element => {
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