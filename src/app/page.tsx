"use client";

import { useEffect, useState } from "react";
import AssetCard from "@/components/AssetCard";
import Carousel from "@/components/Carousel";
import { weddingInvitationDetails } from "@/data/constant";
import HeroSection from "@/components/HeroSection";
import VideoPlayer from "@/components/VideoPlayer";
import { motion, AnimatePresence } from "framer-motion";
import RecentDownloads from "@/components/RecentDownloads";
import FinalBanner from "@/components/FinalBanner";
import FixedContact from "@/components/FixedContact";
import GiveawayPopupWithCooldown from "@/components/GiveawayPopupmodal";

/**
 * Asset type definition for the main page
 */
type Asset = {
  id: number;
  title: string;
  category: string;
  language: string;
  price: number;
  imageUrl: string;
};

/**
 * Convert wedding invitation details to Asset format for display
 */
const assets: Asset[] = weddingInvitationDetails.map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  language: item.language,
  price: item.price,
  imageUrl: item.imageUrl,
}));

/**
 * Custom hook to handle client-side mounting
 * Prevents hydration mismatch by ensuring component is mounted
 */
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}

/**
 * Home page component
 * Main landing page with search, filtering, and asset display
 * Features multiple sections including hero, assets grid, video player, and carousel
 */
export default function Home() {
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(assets);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const hasMounted = useHasMounted();
  // const { isModalOpen, closeModal } = useUserFormModal();

  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);

  /**
   * Handles category selection from carousel or tabs
   * Filters assets based on selected category
   */
  const handleCategorySelect = (category: string) => {
    const filtered =
      category === "all"
        ? assets
        : assets.filter((asset) => asset.category === category);
    setFilteredAssets(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const getPaginatedAssets = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAssets.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <>
      {/* Giveaway Popup */}
      <GiveawayPopupWithCooldown />
        
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          filteredAssets={filteredAssets}
          setFilteredAssets={setFilteredAssets}
        />

        {/* Assets Grid */}
        <section
          id="searchbar-section"
          className="max-w-[1600px] w-full mx-auto px-4 py-12"
        >
          <div className="max-w-[1600px] mx-auto">
            {filteredAssets.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {getPaginatedAssets().map((asset) => (
                    <div key={asset.id} className="animate-fade-in w-full">
                      <AssetCard
                        id={asset.id}
                        title={asset.title}
                        category={asset.category}
                        language={asset.language}
                        price={asset.price}
                        imageUrl={asset.imageUrl}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    <span className="px-4 py-2 text-purple-300">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              hasMounted && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center py-16"
                  >
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      No Results Found
                    </h3>
                    <p className="mt-4 text-gray-400 text-lg">
                      We couldn&apos;t find any assets matching your search or
                      filters.
                      <br />
                      We&apos;re working hard to add more—please check back
                      soon!
                    </p>
                  </motion.div>
                </AnimatePresence>
              )
            )}
          </div>
        </section>

        {/* Video Player Section */}
        <section className="w-full bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#3a3a6a] py-0">
          <VideoPlayer />
        </section>

        {/* Carousel Section */}
        <section className="w-full mx-auto px-4 py-8">
          <div className="animate-slide-up">
            <Carousel onCategorySelect={handleCategorySelect} />
          </div>
        </section>

        {/* Recent Downloads Section */}
        <section className="w-full place-items-center">
          <RecentDownloads />
        </section>


        <FinalBanner />

        {/* Fixed Contact Card with Icons */}
        <FixedContact />
      </div>


      {/* Footer */}
      <footer className="w-full text-center py-4 text-sm text-blue-200 bg-gradient-to-b from-[#0d0820] to-[#1a1530]">
        Powered by <span className="font-bold text-pink-400">@Nexzap</span>
      </footer>
    </>
  );
}
