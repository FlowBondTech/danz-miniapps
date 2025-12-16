'use client'

import { useState, useCallback } from 'react'
import { CheckInScreen } from './CheckInScreen'
import { PointsBurst } from './PointsBurst'
import { ReflectionScreen } from './ReflectionScreen'
import { RewardsScreen } from './RewardsScreen'
import { BondSuggestionSection } from '../bonds'
import {
  type CheckInStep,
  type DanceReflection,
  type CheckInRewards,
  calculateCheckInRewards,
} from './types'
import { SuggestedBond } from '@/types/bonds'

// Mock bond suggestions - will be replaced with real API data
const MOCK_BOND_SUGGESTIONS: SuggestedBond[] = [
  {
    id: '1',
    suggestedUser: {
      id: 'user1',
      fid: 12345,
      username: 'dancequeen',
      displayName: 'Dance Queen',
      avatarUrl: null,
      bio: 'Dancing every day since 2023. Hip-hop enthusiast.',
    },
    compatibilityScore: 92,
    bondType: 'streak_partner',
    matchReasons: [
      { type: 'streak_match', score: 95, detail: 'Both on 10+ day streaks' },
      { type: 'same_style', score: 88, detail: 'Both love hip-hop' },
      { type: 'similar_time', score: 85, detail: 'Both dance in the evening' },
    ],
    status: 'pending',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    suggestedUser: {
      id: 'user2',
      fid: 67890,
      username: 'groovyking',
      displayName: 'Groovy King',
      avatarUrl: null,
      bio: 'Salsa dancer. Building my streak one day at a time.',
    },
    compatibilityScore: 87,
    bondType: 'dance_buddy',
    matchReasons: [
      { type: 'activity_level', score: 90, detail: 'Similar dance frequency' },
      { type: 'mutual_friends', score: 82, detail: '3 mutual connections' },
      { type: 'mood_match', score: 78, detail: 'Similar mood patterns' },
    ],
    status: 'pending',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  },
]

interface DailyCheckInProps {
  currentStreak?: number
  hasCheckedInToday?: boolean
}

export function DailyCheckIn({
  currentStreak = 0,
  hasCheckedInToday = false,
}: DailyCheckInProps) {
  const [step, setStep] = useState<CheckInStep>('checkin')
  const [showBurst, setShowBurst] = useState(false)
  const [didDance, setDidDance] = useState(false)
  const [reflection, setReflection] = useState<DanceReflection | null>(null)
  const [rewards, setRewards] = useState<CheckInRewards | null>(null)

  // New streak after check-in
  const newStreak = didDance ? currentStreak + 1 : 0

  const handleCheckIn = useCallback((danced: boolean) => {
    setDidDance(danced)

    if (danced) {
      // Show points burst animation
      setShowBurst(true)
    } else {
      // Skip to rewards with streak reset message
      const calculatedRewards = calculateCheckInRewards(0, false)
      setRewards(calculatedRewards)
      setStep('rewards')
    }
  }, [])

  const handleBurstComplete = useCallback(() => {
    setShowBurst(false)
    setStep('reflection')
  }, [])

  const handleReflectionSubmit = useCallback((reflectionData: DanceReflection | null) => {
    setReflection(reflectionData)
    const hasReflection = reflectionData !== null &&
      !!(reflectionData.feeling || (reflectionData.benefits && reflectionData.benefits.length > 0))
    const calculatedRewards = calculateCheckInRewards(newStreak, hasReflection)
    setRewards(calculatedRewards)
    setStep('rewards')
  }, [newStreak])

  const handleSkipReflection = useCallback(() => {
    const calculatedRewards = calculateCheckInRewards(newStreak, false)
    setRewards(calculatedRewards)
    setStep('rewards')
  }, [newStreak])

  // Already checked in today
  if (hasCheckedInToday) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-danz-pink-500 to-danz-purple-600 flex items-center justify-center shadow-neon-pink mb-6">
          <span className="text-5xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          You&apos;ve checked in today!
        </h1>
        <p className="text-gray-400 mb-4">
          Come back tomorrow to continue your streak
        </p>
        <div className="px-4 py-2 rounded-full bg-danz-dark-800 border border-danz-pink-500/30">
          <span className="text-danz-pink-300">
            🔥 {currentStreak} day streak
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Points burst overlay */}
      {showBurst && (
        <PointsBurst
          points={50}
          streakBonus={Math.min(newStreak * 5, 50)}
          onComplete={handleBurstComplete}
        />
      )}

      {/* Main content */}
      {step === 'checkin' && (
        <CheckInScreen
          streak={currentStreak}
          onCheckIn={handleCheckIn}
        />
      )}

      {step === 'reflection' && (
        <ReflectionScreen
          onSubmit={handleReflectionSubmit}
          onSkip={handleSkipReflection}
        />
      )}

      {step === 'rewards' && rewards && (
        <RewardsScreen
          rewards={rewards}
          hasReflection={reflection !== null}
          bondSuggestions={MOCK_BOND_SUGGESTIONS}
        />
      )}
    </div>
  )
}
