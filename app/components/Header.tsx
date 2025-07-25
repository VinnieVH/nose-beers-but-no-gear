import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import MobileNavigation from './MobileNavigation'
import MobileMenuButton from './MobileMenuButton'
import NavLinks from './NavLinks'

const Header = (): React.JSX.Element => {
  return (
    <header className="bg-white dark:bg-pandaria-dark border-b-2 border-pandaria-primary dark:border-pandaria-primary-dark shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/wipe-inc.jpg"
                alt="Guild Logo"
                width={48}
                height={48}
                className="w-12 h-12 mr-3 rounded-full border-2 border-pandaria-accent shadow-lg transform hover:rotate-12 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-pandaren text-pandaria-secondary dark:text-pandaria-accent font-bold">
                  Nose Beers But No Gear
                </span>
              </div>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <NavLinks orientation="horizontal" />
            </nav>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Suspense fallback={null}>
              <MobileMenuButton />
            </Suspense>
          </div>
        </div>
        {/* Mobile Navigation */}
        <Suspense fallback={null}>
          <MobileNavigation />
        </Suspense>
      </div>
    </header>
  )
}

export default Header 