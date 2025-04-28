import Image from 'next/image'
import { X } from 'lucide-react'

interface AssetDetailModalProps {
  asset: {
    id: number
    title: string
    category: string
    language: string
    price: number
    imageUrl: string
  }
  onClose: () => void
}

export default function AssetDetailModal({ asset, onClose }: AssetDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{asset.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative aspect-video mb-4">
            <Image
              src={asset.imageUrl}
              alt={asset.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <p className="text-gray-600">Language: {asset.language}</p>
              <div className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full inline-block">
                {asset.category}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <p className="text-xl font-bold">₹{asset.price.toLocaleString('en-IN')}</p>
              <button className="btn-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 