'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MyPartyBanner, PartyCard, PartyLeaderboard, CreatePartyModal, JoinPartyModal, PartyDetailView } from '@/components/party'
import { BottomNav } from '@/components/ui/BottomNav'
import { DanzParty, PartyLeaderboard as PartyLeaderboardType } from '@/types/party'

// Mock data - will be replaced with real API data
const MOCK_USER_PARTY: DanzParty = {
  id: 'party1',
  name: 'Night Owls',
  description: 'Dancing into the night, every night!',
  avatarEmoji: '🦉',
  tier: 'rising',
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  createdBy: 'user1',
  status: 'active',
  members: [
    {
      id: 'user1',
      fid: 12345,
      username: 'dancequeen',
      displayName: 'Dance Queen',
      avatarUrl: null,
      role: 'leader',
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      currentStreak: 15,
      totalContributions: 3500,
      lastCheckinAt: new Date().toISOString(),
      isActiveToday: true,
    },
    {
      id: 'currentUser',
      fid: 11111,
      username: 'you',
      displayName: 'You',
      avatarUrl: null,
      role: 'member',
      joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      currentStreak: 5,
      totalContributions: 850,
      lastCheckinAt: new Date().toISOString(),
      isActiveToday: true,
    },
    {
      id: 'user2',
      fid: 67890,
      username: 'groovyking',
      displayName: 'Groovy King',
      avatarUrl: null,
      role: 'co-leader',
      joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      currentStreak: 12,
      totalContributions: 2800,
      lastCheckinAt: null,
      isActiveToday: false,
    },
    {
      id: 'user3',
      fid: 11223,
      username: 'rhythmstar',
      displayName: 'Rhythm Star',
      avatarUrl: null,
      role: 'member',
      joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      currentStreak: 8,
      totalContributions: 1200,
      lastCheckinAt: new Date().toISOString(),
      isActiveToday: true,
    },
  ],
  maxMembers: 10,
  minMembers: 2,
  isPublic: true,
  stats: {
    totalXp: 8350,
    weeklyXp: 2150,
    averageStreak: 10,
    activeMembers: 3,
    longestCollectiveStreak: 5,
    partyStreak: 3,
  },
  currentMultiplier: 1.25,
  bonusPool: 0,
}

const MOCK_DISCOVER_PARTIES: DanzParty[] = [
  {
    id: 'party2',
    name: 'Morning Movers',
    description: 'Early risers who start the day dancing!',
    avatarEmoji: '🌅',
    tier: 'hot',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'user5',
    status: 'active',
    members: Array(12).fill(null).map((_, i) => ({
      id: `mm_user${i}`,
      fid: 20000 + i,
      username: `mover${i}`,
      displayName: `Mover ${i}`,
      avatarUrl: null,
      role: i === 0 ? 'leader' : 'member',
      joinedAt: new Date().toISOString(),
      currentStreak: Math.floor(Math.random() * 20),
      totalContributions: Math.floor(Math.random() * 5000),
      lastCheckinAt: Math.random() > 0.3 ? new Date().toISOString() : null,
      isActiveToday: Math.random() > 0.3,
    })) as DanzParty['members'],
    maxMembers: 15,
    minMembers: 2,
    isPublic: true,
    stats: {
      totalXp: 45000,
      weeklyXp: 8500,
      averageStreak: 14,
      activeMembers: 9,
      longestCollectiveStreak: 12,
      partyStreak: 7,
    },
    currentMultiplier: 1.35,
    bonusPool: 500,
  },
  {
    id: 'party3',
    name: 'Hip Hop Crew',
    description: 'Breaking it down, one move at a time',
    avatarEmoji: '🎤',
    tier: 'starter',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'user10',
    status: 'active',
    members: Array(3).fill(null).map((_, i) => ({
      id: `hh_user${i}`,
      fid: 30000 + i,
      username: `hiphop${i}`,
      displayName: `HipHop ${i}`,
      avatarUrl: null,
      role: i === 0 ? 'leader' : 'member',
      joinedAt: new Date().toISOString(),
      currentStreak: Math.floor(Math.random() * 5),
      totalContributions: Math.floor(Math.random() * 500),
      lastCheckinAt: Math.random() > 0.5 ? new Date().toISOString() : null,
      isActiveToday: Math.random() > 0.5,
    })) as DanzParty['members'],
    maxMembers: 5,
    minMembers: 2,
    isPublic: true,
    stats: {
      totalXp: 1200,
      weeklyXp: 800,
      averageStreak: 3,
      activeMembers: 2,
      longestCollectiveStreak: 2,
      partyStreak: 1,
    },
    currentMultiplier: 1.12,
    bonusPool: 0,
  },
]

const MOCK_LEADERBOARD: PartyLeaderboardType[] = [
  { rank: 1, party: { id: 'lb1', name: 'Dance Legends', avatarEmoji: '👑', tier: 'legendary', memberCount: 28 }, weeklyXp: 52000, partyStreak: 45 },
  { rank: 2, party: { id: 'lb2', name: 'Groove Masters', avatarEmoji: '🎵', tier: 'fire', memberCount: 18 }, weeklyXp: 38000, partyStreak: 32 },
  { rank: 3, party: { id: 'party2', name: 'Morning Movers', avatarEmoji: '🌅', tier: 'hot', memberCount: 12 }, weeklyXp: 8500, partyStreak: 7 },
  { rank: 4, party: { id: 'party1', name: 'Night Owls', avatarEmoji: '🦉', tier: 'rising', memberCount: 4 }, weeklyXp: 2150, partyStreak: 3 },
  { rank: 5, party: { id: 'lb5', name: 'Salsa Squad', avatarEmoji: '💃', tier: 'rising', memberCount: 8 }, weeklyXp: 1800, partyStreak: 5 },
]

type ViewState = 'home' | 'detail' | 'browse'

export default function PartyPage() {
  const [view, setView] = useState<ViewState>('home')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [selectedParty, setSelectedParty] = useState<DanzParty | null>(null)
  const [userParty] = useState<DanzParty | null>(MOCK_USER_PARTY)

  const handleCreateParty = async (data: { name: string; description: string; emoji: string; isPublic: boolean }) => {
    // TODO: Implement API call
    console.log('Creating party:', data)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleLeaveParty = async () => {
    // TODO: Implement API call
    console.log('Leaving party')
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleOpenJoinModal = (partyId: string) => {
    const party = MOCK_DISCOVER_PARTIES.find(p => p.id === partyId)
    if (party) {
      setSelectedParty(party)
      setShowJoinModal(true)
    }
  }

  const handleJoinParty = async (partyId: string) => {
    // TODO: Implement API call
    console.log('Joining party:', partyId)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  if (view === 'detail' && userParty) {
    return (
      <PartyDetailView
        party={userParty}
        currentUserId="currentUser"
        onLeaveParty={handleLeaveParty}
        onInviteMember={() => {}}
        onBack={() => setView('home')}
      />
    )
  }

  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-bg-secondary/80 backdrop-blur-md">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🎉</span> DANZ Party
        </h1>
        <Link
          href="/shop"
          className="px-3 py-1.5 bg-gradient-to-r from-danz-pink-500/20 to-danz-purple-500/20 rounded-full text-sm font-medium text-danz-pink-400 hover:bg-danz-pink-500/30 transition-colors"
        >
          🏪 Shop
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 space-y-6">
        {/* User's party or CTA */}
        <MyPartyBanner
          party={userParty}
          onCreateParty={() => setShowCreateModal(true)}
          onViewParty={() => userParty ? setView('detail') : setView('browse')}
        />

        {/* Party Leaderboard */}
        <PartyLeaderboard
          leaderboard={MOCK_LEADERBOARD}
          userPartyId={userParty?.id}
        />

        {/* Discover parties */}
        {!userParty && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Discover Parties</h2>
            <div className="space-y-3">
              {MOCK_DISCOVER_PARTIES.map(party => (
                <PartyCard
                  key={party.id}
                  party={party}
                  onJoin={handleOpenJoinModal}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Auto-hide Bottom Navigation */}
      <BottomNav />

      {/* Create party modal */}
      <CreatePartyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateParty}
      />

      {/* Join party modal */}
      <JoinPartyModal
        isOpen={showJoinModal}
        party={selectedParty}
        onClose={() => {
          setShowJoinModal(false)
          setSelectedParty(null)
        }}
        onJoin={handleJoinParty}
      />
    </div>
  )
}
