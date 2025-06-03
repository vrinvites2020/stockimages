import Image from "next/image";
import { useRouter } from "next/navigation";

interface AssetCardProps {
  id: number;
  title: string;
  category: string;
  language: string;
  price: number;
  imageUrl: string;
}

export default function AssetCard({
  id,
  title,
  price,
  imageUrl,
}: AssetCardProps) {
  const router = useRouter();

  return (
    <div
      className="group cursor-pointer w-full max-w-sm sm:max-w-md lg:max-w-lg bg-[#c3a4ff] rounded-xl shadow-lg overflow-hidden transition-all duration-300 mx-auto"
      onClick={() => router.push(`/assets/${id}`)}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 rounded-b-2xl"
        />
      </div>

      <div className="px-4 py-2 text-black font-medium">
        <h3 className="truncate text-lg">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="mt-1 text-md">price ₹{price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/assets/${id}`);
            }}
            className="mt-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-6 rounded-full transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
