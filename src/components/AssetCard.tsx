import Image from 'next/image'
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

  return (
    <>
      <div
        className="card hover-card group cursor-pointer w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 transition-all duration-500 relative text-white"
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
          <h3 className="font-semibold text-lg truncate text-white text-center w-full drop-shadow-lg">{title}</h3>
          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-xs bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full font-medium shadow">{language}</span>
            <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full font-medium shadow">{category}</span>
          </div>
          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-lg font-bold text-pink-400 drop-shadow">₹{price.toLocaleString('en-IN')}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/assets/${id}`)
              }}
              className="btn-primary text-sm px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 