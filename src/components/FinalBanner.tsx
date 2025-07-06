import Image from "next/image";

/**
 * FinalBanner component
 * Displays a decorative banner at the bottom of the page
 * Uses gradient background and contains a promotional image
 */
export default function FinalBanner() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-16 bg-gradient-to-b from-[#0d0820] to-[#1a1530] overflow-hidden">
      <span className="absolute inset-0 select-none pointer-events-none"></span>

      <div className="relative w-full max-w-[500px] h-[120px] px-4 m-[-40px]">
        <Image
          src="/images/banner.png"
          alt="Final Banner"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
