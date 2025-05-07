import Image from 'next/image'
import { useState } from 'react'
import AssetDetailModal from './AssetDetailModal'
import Script from 'next/script'

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
  const [loading, setLoading] = useState(false)

  const initializePayment = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price,
          assetId: id.toString(),
          title: title,
        }),
      })

      const order = await response.json()

      const options: Razorpay.Options = {
        key: 'rzp_test_AZXUgY3fSW20EV',
        amount: order.amount,
        currency: order.currency,
        name: 'Stock Images',
        description: title,
        order_id: order.id,
        handler: function () {
          // The webhook will handle the payment verification
          alert('Payment initiated! You will receive access once the payment is confirmed.');
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#2563EB',
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment initialization error:', error)
      alert('Error initializing payment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  initializePayment()
                }}
                disabled={loading}
                className={`btn-primary text-sm mt-1 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : 'Buy Now'}
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