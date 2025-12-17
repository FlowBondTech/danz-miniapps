'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  emoji: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Check In', emoji: '💃' },
  { href: '/party', label: 'Party', emoji: '🎉' },
  { href: '/shop', label: 'Shop', emoji: '🏪' },
]

interface BottomNavProps {
  className?: string
}

export function BottomNav({ className = '' }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-50
        flex items-center justify-around px-4 py-2
        border-t border-white/10 bg-bg-secondary/95 backdrop-blur-xl
        ${className}
      `}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex flex-col items-center gap-1 py-2 px-4 min-w-[64px]
              transition-all duration-200
              ${isActive
                ? 'text-danz-pink-400 scale-105'
                : 'text-gray-500 hover:text-danz-pink-400 active:scale-95'
              }
            `}
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-xs font-medium">{item.label}</span>
            {isActive && (
              <div className="absolute bottom-1 w-8 h-0.5 rounded-full bg-gradient-to-r from-danz-pink-500 to-danz-purple-500" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
