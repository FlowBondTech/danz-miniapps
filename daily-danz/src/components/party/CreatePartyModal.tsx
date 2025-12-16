'use client'

import { useState } from 'react'
import { PARTY_EMOJI_OPTIONS, PARTY_TIER_CONFIG, PARTY_POOL_CONFIGS, PartyPoolType } from '@/types/party'

interface CreatePartyModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (data: { name: string; description: string; emoji: string; isPublic: boolean; poolType: PartyPoolType }) => Promise<void>
}

export function CreatePartyModal({ isOpen, onClose, onCreate }: CreatePartyModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('🎉')
  const [isPublic, setIsPublic] = useState(true)
  const [poolType, setPoolType] = useState<PartyPoolType>('large')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Please enter a party name')
      return
    }

    if (name.length < 3) {
      setError('Party name must be at least 3 characters')
      return
    }

    if (name.length > 24) {
      setError('Party name must be 24 characters or less')
      return
    }

    setIsCreating(true)
    try {
      await onCreate({
        name: name.trim(),
        description: description.trim(),
        emoji: selectedEmoji,
        isPublic,
        poolType,
      })
      onClose()
    } catch (err) {
      setError('Failed to create party. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const starterTier = PARTY_TIER_CONFIG.starter

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-section rounded-t-3xl sm:rounded-3xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-white/5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-white">Create a DANZ Party</h2>
          <p className="text-gray-400 text-sm mt-1">
            Start your crew and earn bonus XP together
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Emoji selector */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Party Icon</label>
            <div className="flex flex-wrap gap-2">
              {PARTY_EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center text-xl
                    transition-all duration-200
                    ${selectedEmoji === emoji
                      ? 'glass-card-highlight scale-110 shadow-[0_0_15px_rgba(255,110,199,0.3)]'
                      : 'glass-card hover:scale-105'
                    }
                  `}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Party Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Night Owls, Morning Movers"
              maxLength={24}
              className="w-full px-4 py-3 rounded-xl glass-card
                         text-white placeholder-gray-500
                         focus:outline-none focus:border-danz-pink-500/50 focus:shadow-[0_0_15px_rgba(255,110,199,0.2)]
                         transition-all duration-200"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">3-24 characters</span>
              <span className={`text-xs ${name.length > 20 ? 'text-orange-400' : 'text-gray-500'}`}>
                {name.length}/24
              </span>
            </div>
          </div>

          {/* Description input */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's your party about?"
              maxLength={100}
              rows={2}
              className="w-full px-4 py-3 rounded-xl glass-card
                         text-white placeholder-gray-500 resize-none
                         focus:outline-none focus:border-danz-pink-500/50 focus:shadow-[0_0_15px_rgba(255,110,199,0.2)]
                         transition-all duration-200"
            />
          </div>

          {/* Privacy toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl glass-card">
            <div>
              <div className="text-white font-medium">Public Party</div>
              <div className="text-gray-400 text-sm">
                {isPublic ? 'Anyone can find and join' : 'Invite only with code'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`
                relative w-12 h-7 rounded-full transition-colors duration-200
                ${isPublic ? 'bg-danz-pink-500' : 'bg-gray-600'}
              `}
            >
              <div className={`
                absolute top-1 w-5 h-5 rounded-full bg-white shadow-md
                transition-transform duration-200
                ${isPublic ? 'left-6' : 'left-1'}
              `} />
            </button>
          </div>

          {/* Tier info */}
          <div className="p-4 rounded-xl glass-card-highlight">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{starterTier.emoji}</span>
              <span className={`font-medium ${starterTier.color}`}>{starterTier.label} Tier</span>
            </div>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Up to {starterTier.maxMembers} members</li>
              <li>• +{(starterTier.multiplierBonus * 100).toFixed(0)}% base XP bonus</li>
              <li>• Level up by earning more XP together</li>
            </ul>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-xl glass-card border-red-500/30 text-red-400 text-sm shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isCreating || !name.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-danz-pink-500 to-danz-purple-500
                       text-white font-semibold shadow-glow-pink
                       hover:shadow-neon-glow hover:scale-[1.02] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isCreating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Party...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🎉</span>
                Create Party
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
