import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  logoSrc?: string // Optional: path to logo image
}

export default function Logo({ className = '', size = 'md', showText = true, logoSrc = '/logo.png' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16 sm:w-18 sm:h-18',
    lg: 'w-24 h-24'
  }

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  }

  const iconTextClasses = {
    sm: 'text-xs',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg'
  }

  const LogoIcon = () => {
    if (logoSrc) {
      return (
        <div className={`${sizeClasses[size]} relative`}>
          <Image
            src={logoSrc}
            alt="SelfMove Logo"
            fill
            className="object-contain scale-[1.75] sm:scale-[2.25]"
            priority
          />
        </div>
      )
    }

    // Fallback to CSS-based logo
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}>
        <span className={`text-white ${iconTextClasses[size]} font-bold`}>SM</span>
      </div>
    )
  }

  return (
    <Link 
      href="/" 
      className={`flex items-center space-x-2 ${textSizeClasses[size]} font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 ml-4 sm:ml-0 ${className}`}
    >
      <LogoIcon />
      {showText && <span>SelfMove</span>}
    </Link>
  )
} 