import React, { useEffect, useState, useCallback } from 'react'
import { ThemeContext } from './theme'
import { ThemeMode } from '../shared/enums'
interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps): React.JSX.Element => {
  // Check if user has a preference stored in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      // If user has explicitly set a theme, use that
      if (savedTheme) {
        return savedTheme === ThemeMode.Dark
      }
      // Otherwise, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false // Default to light mode
  })

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', isDarkMode ? ThemeMode.Dark : ThemeMode.Light)
    // Update document class for tailwind dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
