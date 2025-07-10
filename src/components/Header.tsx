import React, { useState, useCallback } from 'react'
import { Link } from 'react-router'
import { MenuIcon, XIcon, SunIcon, MoonIcon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import wipeInc from '../assets/wipe-inc.jpg'

interface NavLinkProps {
  to: string
  children: React.ReactNode
}

interface MobileNavLinkProps {
  to: string
  children: React.ReactNode
  onClick: () => void
}

interface ThemeToggleProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

const Header = (): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen])
  
  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className="bg-white dark:bg-pandaria-dark border-b-2 border-pandaria-primary dark:border-pandaria-primary-dark shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={wipeInc}
                alt="Guild Logo"
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
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <button
              onClick={handleMenuToggle}
              className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent focus:outline-none"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-3 border-t border-pandaria-primary/30 bg-white dark:bg-pandaria-dark rounded-b-lg shadow-lg transition-colors duration-300">
            <div className="flex flex-col space-y-3">
              <MobileNavLink to="/" onClick={handleCloseMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/roster" onClick={handleCloseMenu}>
                Roster
              </MobileNavLink>
              <MobileNavLink to="/raids" onClick={handleCloseMenu}>
                Raids
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={handleCloseMenu}>
                About
              </MobileNavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

const NavLink = ({ to, children }: NavLinkProps): React.JSX.Element => (
  <Link
    to={to}
    className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors px-4 py-2 rounded-full hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 border border-transparent hover:border-pandaria-primary/20 font-medium"
  >
    {children}
  </Link>
)

const MobileNavLink = ({ to, children, onClick }: MobileNavLinkProps): React.JSX.Element => (
  <Link
    to={to}
    className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors block px-4 py-2 hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 rounded-lg"
    onClick={onClick}
  >
    {children}
  </Link>
)

const ThemeToggle = ({ isDarkMode, toggleTheme }: ThemeToggleProps): React.JSX.Element => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full bg-pandaria-primary/10 dark:bg-pandaria-primary/20 hover:bg-pandaria-primary/20 dark:hover:bg-pandaria-primary/30 transition-colors"
    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {isDarkMode ? (
      <SunIcon className="h-5 w-5 text-pandaria-accent" />
    ) : (
      <MoonIcon className="h-5 w-5 text-pandaria-secondary" />
    )}
  </button>
)

export default Header
