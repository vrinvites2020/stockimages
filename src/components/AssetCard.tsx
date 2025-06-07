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
      className="group cursor-pointer w-full bg-[#c3a4ff] rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onClick={() => router.push(`/assets/${id}`)}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="p-4 text-black">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <div className="flex items-center justify-between mt-3">
          <p className="text-md font-medium">₹{price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/assets/${id}`);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded-full transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}