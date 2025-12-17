'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PartyShop } from '@/components/party'
import { BottomNav } from '@/components/ui/BottomNav'
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
      <header className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-bg-secondary/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Link
            href="/party"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
          >
            ←
          </Link>
          <span className="font-display font-bold text-base">DANZ Shop</span>
        </div>
      </header>

      {/* Shop Content - add padding for auto-hide nav */}
      <main className="flex-1 overflow-hidden pb-20">
        <PartyShop
          userBalance={userBalance}
          ownedItems={ownedItems}
          onPurchase={handlePurchase}
        />
      </main>

      {/* Auto-hide Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
