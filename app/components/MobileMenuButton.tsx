'use client'

import React from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { MenuIcon, XIcon } from 'lucide-react'

const MobileMenuButton = (): React.JSX.Element => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  
  const isMenuOpen = searchParams.get('menu') === 'open'
  
  const toggleMenu = () => {
    const params = new URLSearchParams(searchParams)
    if (isMenuOpen) {
      params.delete('menu')
    } else {
      params.set('menu', 'open')
    }
    router.push(`${pathname}?${params.toString()}`)
  }
  
  return (
    <button
      onClick={toggleMenu}
      className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent focus:outline-none"
    >
      {isMenuOpen ? (
        <XIcon className="h-6 w-6" />
      ) : (
        <MenuIcon className="h-6 w-6" />
      )}
    </button>
  )
}

export default MobileMenuButton 