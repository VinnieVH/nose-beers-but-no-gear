import React, { useEffect, useState } from 'react'
import { ThemeContext } from './theme'
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Check if user has a preference stored in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      // If user has explicitly set a theme, use that
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      // Otherwise, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false // Default to light mode
  })
  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    // Update document class for tailwind dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }
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
