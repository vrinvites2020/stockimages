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
      className="group cursor-pointer w-full bg-[#c3a4ff] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
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

      <div className="bg-[#7A5FFF] flex items-center justify-between px-4 py-3 text-white">
        <div>
          <p className="text-md font-medium">{title}</p>
          <p className="text-md font-semibold">₹{price}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/assets/${id}`);
          }}
          className="bg-white text-[#003049] font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 transition hover:bg-gray-100"
        >
          DOWNLOAD
          <div className="bg-[#1A9CB0] p-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
