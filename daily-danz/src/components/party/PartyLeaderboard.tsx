'use client'

import { PartyLeaderboard as PartyLeaderboardType, PARTY_TIER_CONFIG } from '@/types/party'

interface PartyLeaderboardProps {
  leaderboard: PartyLeaderboardType[]
  userPartyId?: string
}

export function PartyLeaderboard({ leaderboard, userPartyId }: PartyLeaderboardProps) {
  return (
    <div className="glass-section">
      <div className="glass-section-inner space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <span>Top Parties</span>
          </h2>
          <span className="stat-pill">
            <span className="text-gray-400">This Week</span>
          </span>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-2">
          {leaderboard.map((entry, index) => {
            const isUserParty = entry.party.id === userPartyId
            const tierConfig = PARTY_TIER_CONFIG[entry.party.tier]
            const isTop3 = entry.rank <= 3

            // Determine card style
            const cardClass = isUserParty
              ? 'glass-card-highlight'
              : isTop3 && entry.rank === 1
              ? 'glass-card-gold'
              : 'glass-card'

            // Determine rank badge style
            const rankBadgeClass = entry.rank === 1
              ? 'rank-badge rank-badge-gold'
              : entry.rank === 2
              ? 'rank-badge rank-badge-silver'
              : entry.rank === 3
              ? 'rank-badge rank-badge-bronze'
              : 'rank-badge'

            return (
              <div
                key={entry.party.id}
                className={`${cardClass} p-3 flex items-center gap-3`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Rank Badge */}
                <div className={rankBadgeClass}>
                  {isTop3 ? (
                    <span className="text-base">{['🥇', '🥈', '🥉'][entry.rank - 1]}</span>
                  ) : (
                    <span className="text-gray-400">{entry.rank}</span>
                  )}
                </div>

                {/* Party Avatar & Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="avatar-glow w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-lg border border-white/10">
                    {entry.party.avatarEmoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium truncate">
                        {entry.party.name}
                      </span>
                      {isUserParty && (
                        <span className="stat-pill-accent text-[10px] px-2 py-0.5">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs ${tierConfig.color}`}>
                        {tierConfig.emoji} {tierConfig.label}
                      </span>
                      <span className="text-[10px] text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {entry.party.memberCount} members
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right shrink-0 space-y-1">
                  <div className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                    {entry.weeklyXp.toLocaleString()}
                    <span className="text-[10px] text-gray-500 font-normal ml-1">XP</span>
                  </div>
                  <div className="stat-pill text-[10px] py-0.5 px-2">
                    <span>🔥</span>
                    <span className="text-orange-400">{entry.partyStreak}d</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Link */}
        <button className="w-full py-2.5 text-center text-sm text-gray-400 hover:text-white transition-colors glass-card hover:glass-card-highlight">
          View Full Leaderboard →
        </button>
      </div>
    </div>
  )
}
