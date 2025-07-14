import Image from "next/image";
import { X } from "lucide-react";

interface GiveawayPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function GiveawayPopup({ open, onClose }: GiveawayPopupProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-2xl shadow-2xl p-0 max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-red-500 bg-white rounded-full p-1 shadow"
          onClick={onClose}
          aria-label="Close giveaway popup"
        >
          <X className="w-7 h-7" />
        </button>
        <div className="w-[90vw] max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] flex items-center justify-center">
          <Image
            src="/images/Giveaway_Popup.jpg"
            alt="Giveaway Popup"
            width={800}
            height={800}
            className="rounded-2xl object-contain w-full h-auto"
            priority
            sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, 800px"
            quality={90}
          />
        </div>
      </div>
    </div>
  );
} 