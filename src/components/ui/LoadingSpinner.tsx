import React from 'react'
interface LoadingSpinnerProps {
  message?: string
}

const LoadingSpinner = ({ message = "Loading..." }: LoadingSpinnerProps): React.JSX.Element => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 border-4 border-pandaria-primary dark:border-pandaria-primaryLight border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-pandaria-dark dark:text-pandaria-light">
        {message}
      </p>
    </div>
  )
}

export default LoadingSpinner 