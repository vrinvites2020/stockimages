'use client';

import { useEffect, useRef } from 'react';

const VideoPlayer = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initializeVideos = async () => {
      try {
        if (videoRef1.current && videoRef2.current) {
          // Set sources directly in the video elements
          videoRef1.current.src = '/videos/01.mp4';
          videoRef2.current.src = '/videos/02.mp4';
          
          // Use Promise.all to load both videos concurrently
          await Promise.all([
            videoRef1.current.play(),
            videoRef2.current.play()
          ]);
        }
      } catch (error) {
        console.error('Error playing videos:', error);
      }
    };

    initializeVideos();

    // Cleanup function to pause videos when component unmounts
    return () => {
      if (videoRef1.current) videoRef1.current.pause();
      if (videoRef2.current) videoRef2.current.pause();
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#3a3a6a] relative overflow-hidden">
      <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* First Video */}
        <div className="relative w-full mb-12 md:mb-16 lg:mb-20 rounded-2xl overflow-hidden transform transition-all duration-500 ">
          <div className="relative w-full h-0 pb-[56.25%] sm:pb-[56.25%] md:pb-[56.25%] lg:pb-[56.25%]">
            <video
              ref={videoRef1}
              className="absolute inset-0 w-full h-full object-contain"
              playsInline
              muted
              loop
              preload="auto"
            />
          </div>
        </div>

        {/* Second Video */}
        <div className="relative w-full rounded-2xl overflow-hidden transform transition-all duration-500 ">
          <div className="relative w-full h-0 pb-[56.25%] sm:pb-[56.25%] md:pb-[56.25%] lg:pb-[56.25%]">
            <video
              ref={videoRef2}
              className="absolute inset-0 w-full h-full object-contain"
              playsInline
              muted
              loop
              preload="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer; 