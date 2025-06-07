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

type Asset = {
  id: number;
  title: string;
  category: string;
  language: string;
  price: number;
  imageUrl: string;
};

const assets: Asset[] = weddingInvitationDetails.map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  language: item.language,
  price: item.price,
  imageUrl: item.imageUrl,
}));

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}

export default function Home() {
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(assets);
  const hasMounted = useHasMounted();

  // When a category is selected from the carousel or tabs
  const handleCategorySelect = (category: string) => {
    const filtered =
      category === "all"
        ? assets
        : assets.filter((asset) => asset.category === category);
    setFilteredAssets(filtered);
  };

  return (
    <>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredAssets.map((asset) => (
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
    </>
  );
}
