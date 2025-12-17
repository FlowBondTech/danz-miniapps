'use client'

import { useState } from 'react'

interface WebLoginPromptProps {
  onSignUp: () => void
}

export function WebLoginPrompt({ onSignUp }: WebLoginPromptProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-8 text-center">
      {/* Logo/Icon */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-danz-pink-500 to-danz-purple-600 flex items-center justify-center shadow-neon-pink mb-6">
        <span className="text-4xl">💃</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-white mb-2">
        Daily DANZ
      </h1>
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        Check in daily, build streaks, and earn rewards for dancing!
      </p>

      {/* Open in Warpcast */}
      <a
        href="https://warpcast.com/~/frames/launch?url=https://dailydanz.app"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-xs py-3 px-6 bg-gradient-to-r from-danz-pink-500 to-danz-purple-600 rounded-xl text-white font-semibold text-center shadow-neon-pink hover:scale-[1.02] transition-transform mb-3"
      >
        Open in Warpcast
      </a>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4 w-full max-w-xs">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-gray-500 text-xs">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Sign Up Button */}
      <button
        onClick={onSignUp}
        className="w-full max-w-xs py-3 px-6 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/15 transition-colors"
      >
        Create DANZ Account
      </button>

      {/* Info */}
      <p className="text-gray-500 text-xs mt-6 max-w-xs">
        Daily DANZ works best in Warpcast or Coinbase Wallet.
        Sign up to get notified when web login is available.
      </p>
    </div>
  )
}

// For testing: A simple FID input form
export function DevLoginForm({
  onLogin,
}: {
  onLogin: (fid: number) => void
}) {
  const [fid, setFid] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fidNum = parseInt(fid, 10)
    if (isNaN(fidNum) || fidNum <= 0) {
      setError('Please enter a valid FID')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Verify user exists via Neynar
      const response = await fetch(`/api/farcaster/user?fid=${fidNum}`)
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'User not found')
      }

      onLogin(fidNum)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mt-4">
      <p className="text-yellow-400 text-xs mb-2">
        Dev Mode: Login with FID
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={fid}
          onChange={(e) => setFid(e.target.value)}
          placeholder="Enter FID"
          className="flex-1 px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-danz-pink-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-danz-pink-500 rounded-lg text-white text-sm font-medium disabled:opacity-50"
        >
          {loading ? '...' : 'Login'}
        </button>
      </form>
      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
    </div>
  )
}
