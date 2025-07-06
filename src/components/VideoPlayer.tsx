'use client';

import { useEffect, useRef } from 'react';

/**
 * VideoPlayer component
 * Displays two video players with automatic playback
 * Loads videos from public/videos directory and handles cleanup on unmount
 */
const VideoPlayer = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;

    /**
     * Initialize and play both videos concurrently
     * Sets video sources and starts playback
     */
    const initializeVideos = async () => {
      try {
        if (video1 && video2) {
          // Set sources directly in the video elements
          video1.src = '/videos/01.mp4';
          video2.src = '/videos/02.mp4';

          // Use Promise.all to load both videos concurrently
          await Promise.all([video1.play(), video2.play()]);
        }
      } catch (error) {
        console.error('Error playing videos:', error);
      }
    };

    initializeVideos();

    // Cleanup function to pause videos when component unmounts
    return () => {
      if (video1) video1.pause();
      if (video2) video2.pause();
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#3a3a6a] relative overflow-hidden">
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col gap-5 pt-2 pb-2 md:pt-6 md:pb-6">
        {/* First Video */}
        <div className="relative w-full rounded-2xl overflow-hidden transform transition-all duration-500">
          <video
            ref={videoRef1}
            className="w-full h-auto object-contain"
            playsInline
            muted
            loop
            preload="auto"
          />
        </div>

        {/* Second Video */}
        <div className="relative w-full rounded-2xl overflow-hidden transform transition-all duration-500">
          <video
            ref={videoRef2}
            className="w-full h-auto object-contain"
            playsInline
            muted
            loop
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
