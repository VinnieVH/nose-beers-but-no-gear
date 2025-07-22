import React from 'react'
import Link from 'next/link'

export interface NavLinksProps {
  orientation?: 'horizontal' | 'vertical'
  includeDiscord?: boolean
  linkClassName?: string
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/roster', label: 'Roster' },
  { href: '/raids', label: 'Raids' },
  { href: '/about', label: 'About' },
]

const DISCORD_LINK = {
  href: 'https://discord.gg/FWCgRQmpxk',
  label: 'Join Our Circus',
  external: true,
}

export const NavLinks = ({ orientation = 'horizontal', includeDiscord = false, linkClassName = '' }: NavLinksProps): React.JSX.Element => {
  const baseLinkClass =
    linkClassName ||
    (orientation === 'vertical'
      ? 'text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors block px-4 py-2 hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 rounded-lg'
      : 'text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent transition-colors px-4 py-2 rounded-full hover:bg-pandaria-primary/10 dark:hover:bg-pandaria-primary/20 border border-transparent hover:border-pandaria-primary/20 font-medium')

  return (
    <>
      {NAV_LINKS.map((link) => (
        <Link key={link.href} href={link.href} className={baseLinkClass}>
          {link.label}
        </Link>
      ))}
      {includeDiscord && (
        <a
          href={DISCORD_LINK.href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseLinkClass}
        >
          {DISCORD_LINK.label}
        </a>
      )}
    </>
  )
}

export default NavLinks 