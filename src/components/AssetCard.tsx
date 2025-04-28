import Image from 'next/image'
import { useState } from 'react'
import AssetDetailModal from './AssetDetailModal'

interface AssetCardProps {
  id: number
  title: string
  category: string
  language: string
  price: number
  imageUrl: string
}

export default function AssetCard({ id, title, category, language, price, imageUrl }: AssetCardProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="card group cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-sm text-gray-500">{language}</span>
              <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {category}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">₹{price.toLocaleString('en-IN')}</span>
              <button className="btn-primary text-sm mt-1">
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AssetDetailModal
          asset={{ id, title, category, language, price, imageUrl }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
} 