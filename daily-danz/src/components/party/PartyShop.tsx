'use client'

import { useState } from 'react'
import {
  ShopItem,
  ItemCategory,
  ItemRarity,
  PROTECTION_ITEMS,
  BOOST_ITEMS,
  UTILITY_ITEMS,
  COSMETIC_ITEMS,
  getAllShopItems,
  getItemsByCategory,
  getRarityColor,
  getRarityBgColor,
} from '@/types/shop'

interface PartyShopProps {
  userBalance: number
  ownedItems?: { itemId: string; quantity: number }[]
  onPurchase: (item: ShopItem) => void
}

export function PartyShop({ userBalance, ownedItems = [], onPurchase }: PartyShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all')
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  const [purchasing, setPurchasing] = useState(false)

  const categories: { id: ItemCategory | 'all'; label: string; emoji: string }[] = [
    { id: 'all', label: 'All', emoji: '🛒' },
    { id: 'protection', label: 'Protection', emoji: '🛡️' },
    { id: 'boost', label: 'Boosts', emoji: '⚡' },
    { id: 'utility', label: 'Utility', emoji: '🔧' },
    { id: 'cosmetic', label: 'Cosmetic', emoji: '🎨' },
  ]

  const items = selectedCategory === 'all'
    ? getAllShopItems()
    : getItemsByCategory(selectedCategory)

  const getOwnedQuantity = (itemId: string) => {
    const owned = ownedItems.find((i) => i.itemId === itemId)
    return owned?.quantity || 0
  }

  const canAfford = (price: number) => userBalance >= price

  const handlePurchase = async (item: ShopItem) => {
    if (!canAfford(item.price)) return
    setPurchasing(true)
    await onPurchase(item)
    setPurchasing(false)
    setSelectedItem(null)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-xl flex items-center gap-2">
            <span>🏪</span> DANZ Shop
          </h2>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-danz-pink-500/20 to-danz-purple-500/20 rounded-full">
            <span className="text-sm">💰</span>
            <span className="font-bold">{userBalance.toLocaleString()}</span>
            <span className="text-xs text-gray-400">DANZ</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-danz-pink-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => {
            const owned = getOwnedQuantity(item.id)
            const affordable = canAfford(item.price)
            const maxed = item.maxStack && owned >= item.maxStack

            return (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`relative p-3 rounded-xl border text-left transition-all ${
                  maxed
                    ? 'bg-white/5 border-white/5 opacity-60'
                    : affordable
                    ? 'bg-bg-card/80 border-white/10 hover:border-neon-pink/30 hover:scale-[1.02]'
                    : 'bg-bg-card/40 border-white/5 opacity-70'
                }`}
              >
                {/* Rarity indicator */}
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${getRarityBgColor(item.rarity)}`} />

                {/* Owned badge */}
                {owned > 0 && (
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-green-500/20 rounded text-xs text-green-400">
                    x{owned}
                  </div>
                )}

                {/* Item Content */}
                <div className="text-center">
                  <span className="text-3xl mb-2 block">{item.emoji}</span>
                  <h4 className="font-medium text-sm mb-1 line-clamp-1">{item.name}</h4>
                  <p className={`text-xs font-medium ${getRarityColor(item.rarity)}`}>
                    {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-2 pt-2 border-t border-white/5 text-center">
                  <span className={`font-bold ${affordable ? 'text-danz-pink-400' : 'text-gray-500'}`}>
                    {item.price} DANZ
                  </span>
                </div>

                {/* Maxed indicator */}
                {maxed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                    <span className="text-xs text-gray-300">MAX</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          />

          <div className="relative w-full max-w-md bg-bg-secondary rounded-t-3xl border-t border-white/10 animate-slide-up">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Item Header */}
            <div className="px-4 pb-4 text-center">
              <span className="text-5xl mb-3 block">{selectedItem.emoji}</span>
              <h3 className="font-display font-bold text-xl">{selectedItem.name}</h3>
              <p className={`text-sm ${getRarityColor(selectedItem.rarity)} mt-1`}>
                {selectedItem.rarity.charAt(0).toUpperCase() + selectedItem.rarity.slice(1)} Item
              </p>
            </div>

            {/* Description */}
            <div className="px-4 pb-4">
              <p className="text-gray-300 text-sm text-center">{selectedItem.description}</p>
            </div>

            {/* Effect */}
            <div className="mx-4 p-3 bg-danz-purple-500/10 rounded-xl border border-danz-purple-500/20 mb-4">
              <p className="text-xs text-gray-400 mb-1">Effect:</p>
              <p className="text-sm font-medium">{selectedItem.effect.description}</p>
            </div>

            {/* Details */}
            <div className="px-4 pb-4 space-y-2">
              {selectedItem.duration && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span>{selectedItem.duration}h</span>
                </div>
              )}
              {selectedItem.maxStack && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Max Stack</span>
                  <span>{selectedItem.maxStack}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">You Own</span>
                <span>{getOwnedQuantity(selectedItem.id)}</span>
              </div>
            </div>

            {/* Purchase Button */}
            <div className="p-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Price</span>
                <span className="font-bold text-xl text-danz-pink-400">
                  {selectedItem.price} DANZ
                </span>
              </div>

              {selectedItem.maxStack && getOwnedQuantity(selectedItem.id) >= selectedItem.maxStack ? (
                <button
                  disabled
                  className="w-full py-3 bg-white/5 rounded-xl text-gray-500 font-medium"
                >
                  Maximum Owned
                </button>
              ) : !canAfford(selectedItem.price) ? (
                <button
                  disabled
                  className="w-full py-3 bg-white/5 rounded-xl text-gray-500 font-medium"
                >
                  Insufficient DANZ ({(selectedItem.price - userBalance).toLocaleString()} more needed)
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(selectedItem)}
                  disabled={purchasing}
                  className="w-full py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl font-medium shadow-glow-pink hover:scale-[1.02] transition-transform disabled:opacity-50"
                >
                  {purchasing ? 'Purchasing...' : `Buy for ${selectedItem.price} DANZ`}
                </button>
              )}
            </div>

            {/* Balance info */}
            <div className="px-4 pb-6 text-center">
              <p className="text-xs text-gray-500">
                Your balance: {userBalance.toLocaleString()} DANZ
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Featured items carousel for homepage
export function FeaturedShopItems({
  items,
  onViewAll,
}: {
  items: ShopItem[]
  onViewAll: () => void
}) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold">🏪 Shop Highlights</h3>
        <button onClick={onViewAll} className="text-sm text-danz-pink-400">
          View All →
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {items.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-28 p-3 bg-bg-card/80 rounded-xl border border-white/10 text-center"
          >
            <span className="text-2xl">{item.emoji}</span>
            <p className="text-xs font-medium mt-1 line-clamp-1">{item.name}</p>
            <p className="text-xs text-danz-pink-400 mt-1">{item.price} DANZ</p>
          </div>
        ))}
      </div>
    </div>
  )
}
