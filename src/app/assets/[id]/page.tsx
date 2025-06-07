'use client';
import Image from 'next/image';
import Script from 'next/script';
import { weddingInvitationDetails } from '@/data/constant';
import RazorpayCheckoutButton from '@/components/RazorpayCheckoutButton';
import { notFound } from 'next/navigation';
import { useState, useRef, use } from 'react';
import { Play, Pause, ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import FixedContact from "@/components/FixedContact";

export default function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const details = weddingInvitationDetails.find(item => item.id === Number(resolvedParams.id));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [showToast, setShowToast] = useState(false);
  
  if (!details) {
    notFound();
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        videoRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] text-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] backdrop-blur-md border-b border-purple-900/40 h-16 shadow-2xl">
        <div className="container mx-auto px-4 py-3 h-16 flex items-center">
          <div className="flex items-center justify-between w-full">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Assets</span>
            </Link>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={clsx('p-2 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300', isLiked ? 'text-pink-500 bg-pink-50' : 'text-gray-600 hover:text-pink-500')}
                aria-label="Like this asset"
              >
                <Heart className={clsx('w-5 h-5 transition-all', isLiked ? 'fill-current scale-110' : '')} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-2 sm:px-4 py-8 pt-20">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
          {/* Left Column - Media */}
          <div className="w-full lg:w-2/3 flex-shrink-0">
            <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 overflow-hidden relative group h-full flex flex-col justify-center">
              {details.imageUrl && details.videoUrl && (
                <div className="relative aspect-video group cursor-pointer">
                  <Image
                    src={details.imageUrl}
                    alt={details.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl"
                    priority
                  />
                  {/* Gradient overlay for readability and animated overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none transition-all duration-500 group-hover:from-pink-500/40 group-hover:via-indigo-500/10 group-hover:to-transparent" />
                  <iframe
                    ref={videoRef}
                    src={`${details.videoUrl.replace('shorts/', 'embed/')}?enablejsapi=1`}
                    className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 rounded-2xl"
                    style={{ opacity: isPlaying ? 1 : 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    tabIndex={0}
                  >
                    <span className="animate-bounce">
                      {isPlaying ? (
                        <Pause className="w-20 h-20 text-white drop-shadow-lg" />
                      ) : (
                        <Play className="w-20 h-20 text-white drop-shadow-lg" />
                      )}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-8 flex flex-col items-center text-center gap-6 h-full justify-center">
              <h1 className="text-3xl font-extrabold mb-2 text-white leading-tight drop-shadow-lg">{details.title}</h1>
              <div className="flex flex-wrap font-bold items-center justify-center gap-3 mb-2">
                <p>Every Purchase Inspires us to create more and sgare even better projects with you</p>
                <p>Your support means everything, thank you for being part of our journey</p>
              </div>
              {details.price && (
                <div className="mb-2 w-full flex flex-col items-center">
                  <div className="flex items-center justify-center mb-4 w-full">
                    <span className="text-4xl font-bold text-white drop-shadow">₹{details.price.toLocaleString('en-IN')}</span>
                  </div>
                  <RazorpayCheckoutButton 
                    amount={details.price} 
                    assetId={details.id.toString()} 
                    title={details.title} 
                    onPaymentSuccess={() => {
                      setShowToast(true);
                      if (downloadRef.current) {
                        downloadRef.current.click();
                      }
                      setTimeout(() => setShowToast(false), 2500);
                    }}
                  />
                  {/* Hidden anchor for programmatic download */}
                  <a
                    href={details.downloadUrl}
                    download
                    ref={downloadRef}
                    style={{ display: 'none' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-6">
          
          {details.features && details.features.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 text-transparent bg-clip-text">Project Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                    <span className="text-white text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span>Payment successful! Downloading your file..</span>
        </div>
      )}

      {/* Fixed Contact Card with Icons */}
        <FixedContact />

    </div>
  );
} 