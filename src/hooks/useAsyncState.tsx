import { useGuild } from '../context/GuildContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorDisplay from '../components/ui/ErrorDisplay'

interface UseAsyncStateOptions {
  loadingMessage?: string
  errorTitle?: string
}

export const useAsyncState = (options: UseAsyncStateOptions = {}) => {
  const { loading, error } = useGuild()
  
  const renderLoadingOrError = () => {
    if (loading) {
      return <LoadingSpinner message={options.loadingMessage} />
    }
    
    if (error) {
      return <ErrorDisplay error={error} title={options.errorTitle} />
    }
    
    return null
  }
  
  return {
    loading,
    error,
    renderLoadingOrError,
    isReady: !loading && !error
  }
} 