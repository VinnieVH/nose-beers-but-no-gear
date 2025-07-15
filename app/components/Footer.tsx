import React from 'react'
import Link from 'next/link'

const Footer = (): React.JSX.Element => {
  return (
    <footer className="bg-white dark:bg-pandaria-dark border-t-2 border-pandaria-primary/30 dark:border-pandaria-primary/20 py-6 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-pandaria-secondary dark:text-pandaria-accent font-bold font-pandaren">
              Nose Beers But No Gear
            </span>
            <p className="text-pandaria-primary text-sm mt-1 italic">
              &quot;Keeping Pandaria silly since 2012&quot;
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8 text-sm">
            <Link
              href="/roster"
              className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent mb-2 md:mb-0 font-medium"
            >
              Our Silly Roster
            </Link>
            <Link
              href="/raids"
              className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent mb-2 md:mb-0 font-medium"
            >
              Raid Shenanigans
            </Link>
            <Link
              href="/about"
              className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent mb-2 md:mb-0 font-medium"
            >
              About Our Pranks
            </Link>
            <a
              href="https://discord.gg/FWCgRQmpxk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pandaria-dark dark:text-pandaria-light hover:text-pandaria-secondary dark:hover:text-pandaria-accent font-medium"
            >
              Join Our Circus
            </a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-pandaria-primary/20 text-center text-pandaria-dark dark:text-pandaria-light/80 text-xs">
          <p>
            © {new Date().getFullYear()} Nose Beers But No Gear. Not affiliated
            with Blizzard Entertainment.
          </p>
          <p className="mt-1">
            World of Warcraft and Blizzard Entertainment are trademarks or
            registered trademarks of Blizzard Entertainment, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 