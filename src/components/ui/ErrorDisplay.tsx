import type { ErrorDisplayProps } from '../../shared/types'

const ErrorDisplay = ({ 
  error, 
  title = "Error", 
  actionText = "Try Again",
  onRetry = () => window.location.reload()
}: ErrorDisplayProps) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-pandaria-secondary/10 dark:bg-pandaria-secondary/20 border border-pandaria-secondary rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl text-pandaria-secondary dark:text-pandaria-secondaryLight mb-2">
          {title}
        </h2>
        <p className="text-pandaria-dark dark:text-pandaria-light">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-pandaria-secondary hover:bg-pandaria-secondaryLight dark:bg-pandaria-secondaryDark dark:hover:bg-pandaria-secondary text-white rounded-lg"
          onClick={onRetry}
        >
          {actionText}
        </button>
      </div>
    </div>
  )
}

export default ErrorDisplay 