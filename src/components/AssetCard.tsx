import Image from 'next/image'
import { useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

interface AssetCardProps {
  id: number
  title: string
  category: string
  language: string
  price: number
  imageUrl: string
}

export default function AssetCard({ id, title, category, language, price, imageUrl }: AssetCardProps) {
  const router = useRouter()
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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY as string,
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
      <div
        className="card hover-card group cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-xs bg-white rounded-2xl shadow-xl border transition-all duration-500 relative"
        onClick={() => router.push(`/assets/${id}`)}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
        </div>
        <div className="p-4 flex flex-col gap-2 items-center justify-center">
          <h3 className="font-semibold text-lg truncate text-gray-800 text-center w-full">{title}</h3>
          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">{language}</span>
            <span className="text-xs bg-pink-50 text-pink-600 px-3 py-1 rounded-full font-medium">{category}</span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-lg font-bold text-pink-600">₹{price.toLocaleString('en-IN')}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                initializePayment()
              }}
              disabled={loading}
              className={`btn-primary text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-indigo-500 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 