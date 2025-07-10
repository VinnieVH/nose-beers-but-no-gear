import React from 'react'
interface CardProps {
  title?: string
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

const Card = ({ children, className = '', title, icon }: CardProps): React.JSX.Element => {
  return (
    <div className={`bg-white dark:bg-pandaria-dark rounded-lg p-6 border border-pandaria-primary/20 dark:border-pandaria-primary/30 shadow-lg transition-colors duration-300 ${className}`}>
      {title && (
        <div className="flex items-center mb-6">
          {icon && (
            <div className="p-3 bg-pandaria-primary/20 dark:bg-pandaria-primary/30 rounded-full mr-4">
              {icon}
            </div>
          )}
          <h2 className="text-2xl font-bold text-pandaria-secondary dark:text-pandaria-accent font-pandaren">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  )
}

export default Card 