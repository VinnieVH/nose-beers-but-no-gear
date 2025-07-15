import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SunIcon } from 'lucide-react'
import { Suspense } from 'react'
import MobileNavigation from './MobileNavigation'
import MobileMenuButton from './MobileMenuButton'

interface NavLinkProps {
  to: string
  children: React.ReactNode
}

// Placeholder theme toggle (no-op)
const ThemeToggle = (): React.JSX.Element => (
  <button
    className="p-2 rounded-full bg-pandaria-primary/10 dark:bg-pandaria-primary/20 hover:bg-pandaria-primary/20 dark:hover:bg-pandaria-primary/30 transition-colors"
    aria-label="Toggle theme (not implemented)"
    disabled
  >
    <SunIcon className="h-5 w-5 text-pandaria-accent" />
  </button>
)

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
              <NavLink to="/">Home</NavLink>
              <NavLink to="/roster">Roster</NavLink>
              <NavLink to="/raids">Raids</NavLink>
              <NavLink to="/about">About</NavLink>
            </nav>
            <ThemeToggle />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <MobileMenuButton />
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

const NavLink = ({ to, children }: NavLinkProps): React.JSX.Element => (
  <Link
    href={to}
    className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors px-4 py-2 rounded-full hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 border border-transparent hover:border-pandaria-primary/20 font-medium"
  >
    {children}
  </Link>
)

export default Header 