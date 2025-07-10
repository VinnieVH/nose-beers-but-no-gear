import React from 'react'
interface ProgressBarProps {
  label: string
  current: number
  total: number
  percentage?: number
  color?: 'primary' | 'accent' | 'secondary'
}

const ProgressBar = ({ label, current, total, percentage, color = 'primary' }: ProgressBarProps): React.JSX.Element => {
  const calculatedPercentage = percentage || (current / total) * 100
  
  const colorClasses = {
    primary: 'bg-pandaria-primary dark:bg-pandaria-primaryLight',
    accent: 'bg-pandaria-accent dark:bg-pandaria-accentLight',
    secondary: 'bg-pandaria-secondary dark:bg-pandaria-secondaryLight'
  }

  const textColorClasses = {
    primary: 'text-pandaria-primary dark:text-pandaria-primaryLight',
    accent: 'text-pandaria-accent dark:text-pandaria-accentLight',
    secondary: 'text-pandaria-secondary dark:text-pandaria-secondaryLight'
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-pandaria-dark dark:text-pandaria-light font-medium">
          {label}
        </span>
        <span className={textColorClasses[color]}>
          {current}/{total}
        </span>
      </div>
      <div className="w-full bg-pandaria-paper dark:bg-pandaria-dark/50 rounded-full h-2.5">
        <div
          className={`${colorClasses[color]} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${calculatedPercentage}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressBar 