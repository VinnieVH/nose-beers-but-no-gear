'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const MobileNavigation = (): React.JSX.Element | null => {
  const searchParams = useSearchParams()
  const isMenuOpen = searchParams.get('menu') === 'open'
  
  if (!isMenuOpen) {
    return null
  }
  
  return (
    <nav className="md:hidden mt-4 py-3 border-t border-pandaria-primary/30 bg-white dark:bg-pandaria-dark rounded-b-lg shadow-lg transition-colors duration-300">
      <div className="flex flex-col space-y-3">
        <Link
          href="/"
          className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors block px-4 py-2 hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 rounded-lg"
        >
          Home
        </Link>
        <Link
          href="/roster"
          className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors block px-4 py-2 hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 rounded-lg"
        >
          Roster
        </Link>
        <Link
          href="/raids"
          className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors block px-4 py-2 hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 rounded-lg"
        >
          Raids
        </Link>
        <Link
          href="/about"
          className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors block px-4 py-2 hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 rounded-lg"
        >
          About
        </Link>
      </div>
    </nav>
  )
}

export default MobileNavigation 