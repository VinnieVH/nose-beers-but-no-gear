'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import NavLinks from './NavLinks'

const MobileNavigation = (): React.JSX.Element | null => {
  const searchParams = useSearchParams()
  const isMenuOpen = searchParams.get('menu') === 'open'
  
  if (!isMenuOpen) {
    return null
  }
  
  return (
    <nav className="md:hidden mt-4 py-3 border-t border-pandaria-primary/30 bg-white dark:bg-pandaria-dark rounded-b-lg shadow-lg transition-colors duration-300">
      <div className="flex flex-col space-y-3">
        <NavLinks orientation="vertical" />
      </div>
    </nav>
  )
}

export default MobileNavigation 