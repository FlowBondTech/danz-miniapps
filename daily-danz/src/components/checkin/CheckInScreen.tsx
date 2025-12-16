'use client'

import { useState } from 'react'

interface CheckInScreenProps {
  streak: number
  onCheckIn: (didDance: boolean) => void
}

export function CheckInScreen({ streak, onCheckIn }: CheckInScreenProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleYes = () => {
    setIsAnimating(true)
    // Let animation play before transitioning
    setTimeout(() => {
      onCheckIn(true)
    }, 800)
  }

  const handleNo = () => {
    onCheckIn(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-6 text-center">
      {/* Streak display */}
      {streak > 0 && (
        <div className="mb-8 px-5 py-2.5 rounded-full bg-gradient-to-r from-danz-pink-500/20 to-danz-purple-500/20 border border-danz-pink-500/40 glow-streak animate-float">
          <span className="text-sm font-medium text-danz-pink-300">
            🔥 {streak} day streak
          </span>
        </div>
      )}

      {/* Main question */}
      <h1 className="text-3xl font-bold text-white mb-3 animate-fade-in">
        Did you dance today?
      </h1>

      <p className="text-gray-400 mb-12 max-w-[280px] animate-fade-in-delay">
        Check in daily to build your streak and earn rewards
      </p>

      {/* Yes button - with animated ring */}
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="absolute -inset-3 rounded-full dance-ring opacity-80" />

        {/* Middle pulsing ring */}
        <div className="absolute -inset-2 rounded-full dance-ring-pulse" />

        {/* Button */}
        <button
          onClick={handleYes}
          disabled={isAnimating}
          className={`
            relative w-48 h-48 rounded-full
            bg-gradient-to-br from-danz-pink-500 via-danz-purple-500 to-danz-pink-600
            shadow-neon-pink
            transition-all duration-300
            hover:scale-105 hover:shadow-neon-glow
            active:scale-95
            disabled:opacity-70
            overflow-hidden
            ${isAnimating ? 'animate-dance-burst scale-110' : ''}
          `}
        >
          {/* Inner gradient shine */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-full" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center z-10">
            <span className="text-5xl mb-2 animate-bounce-subtle">💃</span>
            <span className="text-xl font-bold text-white drop-shadow-lg">
              Yes I Danz&apos;d!
            </span>
          </div>

          {/* Burst animation on click */}
          {isAnimating && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-full h-full rounded-full bg-danz-pink-500 animate-ping opacity-40" />
                <div className="absolute w-[130%] h-[130%] rounded-full bg-danz-purple-500 animate-ping opacity-30" style={{ animationDelay: '0.1s' }} />
                <div className="absolute w-[160%] h-[160%] rounded-full bg-danz-pink-400 animate-ping opacity-20" style={{ animationDelay: '0.2s' }} />
              </div>
              {/* Sparkles */}
              <div className="sparkle-container">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="sparkle"
                    style={{
                      '--angle': `${i * 45}deg`,
                      '--delay': `${i * 0.05}s`
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            </>
          )}
        </button>
      </div>

      {/* Points preview */}
      <div className="mt-10 text-sm text-gray-500 animate-fade-in-delay-2">
        <span className="text-danz-cyan-400 font-semibold">+50 XP</span>
        {streak > 0 && (
          <span className="text-danz-pink-400 font-semibold"> + {Math.min((streak + 1) * 5, 50)} streak bonus</span>
        )}
      </div>

      {/* No option - with subtle ring */}
      <div className="relative mt-8 group">
        {/* Subtle ring on hover */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gray-600/0 via-gray-500/20 to-gray-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleNo}
          className="relative px-6 py-3 rounded-full border border-gray-700/50 text-gray-500 hover:text-gray-300 hover:border-gray-500/50 transition-all duration-300 hover:bg-gray-800/30 backdrop-blur-sm"
        >
          Not today
        </button>
      </div>
    </div>
  )
}
