'use client'

import Link from 'next/link'
import { DailyCheckIn } from '@/components/checkin'
import { MiniAppSplash } from '@/components/ui/MiniAppSplash'
import { useAuth } from '@/contexts/AuthContext'
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'
import { useEffect, useState } from 'react'

export default function Home() {
  const { isLoaded, ready } = useFarcasterSDK()
  const { user, isAuthenticated, isLoading, isFarcasterFrame, openSignupPage } = useAuth()
  const [showSplash, setShowSplash] = useState(true)

  // Mock data - replace with real API data
  const [currentStreak] = useState(3)
  const [hasCheckedInToday] = useState(false)

  // Handle splash screen timing and SDK ready call
  useEffect(() => {
    if (!isLoaded || isLoading) return

    const timer = setTimeout(async () => {
      // CRITICAL: Call ready() to hide Farcaster splash screen
      await ready()
      setShowSplash(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isLoaded, isLoading, ready])

  // Render splash screen
  if (showSplash || !isLoaded || isLoading) {
    return <MiniAppSplash title="Daily Danz" subtitle="Check in. Build streaks. Earn rewards." />
  }

  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-bg-secondary/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Inline SVG logo */}
          <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="url(#hdr-grad)" strokeWidth="3" fill="none" />
            <path d="M24 20 L32 44 L40 20" stroke="url(#hdr-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <defs>
              <linearGradient id="hdr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6ec7" />
                <stop offset="100%" stopColor="#b967ff" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-display font-bold text-lg bg-gradient-neon bg-clip-text text-transparent">
            Daily Danz
          </span>
        </div>

        {/* User avatar if authenticated */}
        {isAuthenticated && user && (
          <div className="flex items-center gap-2">
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.displayName || 'User'}
                className="w-8 h-8 rounded-full border-2 border-neon-pink"
              />
            )}
          </div>
        )}

        {/* Signup button for users not in Farcaster frame */}
        {!isFarcasterFrame && (
          <button onClick={openSignupPage} className="btn-secondary text-sm py-2 px-4">
            Sign Up
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <DailyCheckIn
          currentStreak={currentStreak}
          hasCheckedInToday={hasCheckedInToday}
        />
      </main>

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around px-4 py-2 border-t border-white/10 bg-bg-secondary/80 backdrop-blur-md">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 py-2 px-4 text-danz-pink-400"
        >
          <span className="text-xl">💃</span>
          <span className="text-xs font-medium">Check In</span>
        </Link>
        <Link
          href="/party"
          className="flex flex-col items-center gap-1 py-2 px-4 text-gray-500 hover:text-danz-pink-400 transition-colors"
        >
          <span className="text-xl">🎉</span>
          <span className="text-xs font-medium">Party</span>
        </Link>
        <Link
          href="/shop"
          className="flex flex-col items-center gap-1 py-2 px-4 text-gray-500 hover:text-danz-pink-400 transition-colors"
        >
          <span className="text-xl">🏪</span>
          <span className="text-xs font-medium">Shop</span>
        </Link>
      </nav>

      {/* Footer */}
      <footer className="px-4 py-2 border-t border-white/5 text-center">
        <p className="text-xs text-gray-600">
          Produced by{' '}
          <a
            href="https://flowbond.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-danz-pink-500/60 hover:text-danz-pink-400 transition-colors"
          >
            FlowBond Tech
          </a>
        </p>
      </footer>
    </div>
  )
}
