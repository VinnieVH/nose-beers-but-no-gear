import { Link } from 'react-router'
import type { HeroSectionProps } from '../../shared/types'

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage,
  primaryButton,
  secondaryButton
}: HeroSectionProps) => {
  return (
    <div
      className="relative bg-cover bg-center h-96"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-pandaria-dark/40 dark:bg-pandaria-dark/40"></div>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pandaria-accent text-center mb-4 font-pandaren drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white text-center max-w-2xl drop-shadow-md">
          {subtitle}
        </p>
        {(primaryButton || secondaryButton) && (
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {primaryButton && (
              <Link
                to={primaryButton.href}
                className="px-6 py-3 bg-pandaria-primary hover:bg-pandaria-primaryLight dark:bg-pandaria-primaryDark dark:hover:bg-pandaria-primary text-white rounded-full font-medium transition-colors shadow-lg"
              >
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton && (
              <Link
                to={secondaryButton.href}
                className="px-6 py-3 bg-pandaria-accent hover:bg-pandaria-accentLight dark:bg-pandaria-accentDark dark:hover:bg-pandaria-accent text-pandaria-dark dark:text-pandaria-dark rounded-full font-medium transition-colors shadow-lg"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection 