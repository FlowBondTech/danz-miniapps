'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PartyShop } from '@/components/party'
import type { ShopItem } from '@/types/shop'

export default function ShopPage() {
  // Mock user balance - replace with real data
  const [userBalance] = useState(500)

  // Mock owned items
  const [ownedItems] = useState([
    { itemId: 'danz_dodge_single', quantity: 2 },
    { itemId: 'xp_boost_small', quantity: 1 },
  ])

  const handlePurchase = async (item: ShopItem) => {
    // TODO: Implement real purchase logic
    console.log('Purchasing:', item.name)
    // Mock delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert(`Successfully purchased ${item.name}!`)
  }

  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-bg-secondary/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/party"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            ←
          </Link>
          <span className="font-display font-bold text-lg">DANZ Shop</span>
        </div>
      </header>

      {/* Shop Content */}
      <main className="flex-1 overflow-hidden">
        <PartyShop
          userBalance={userBalance}
          ownedItems={ownedItems}
          onPurchase={handlePurchase}
        />
      </main>

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around px-4 py-2 border-t border-white/10 bg-bg-secondary/80 backdrop-blur-md">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 py-2 px-4 text-gray-500 hover:text-danz-pink-400 transition-colors"
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
          className="flex flex-col items-center gap-1 py-2 px-4 text-danz-pink-400"
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
