"use client";
import Image from "next/image";
import Script from "next/script";
import { weddingInvitationDetails } from "@/data/constant";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";
import { notFound } from "next/navigation";
import { useState, useRef, use } from "react";
import { Play, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import FixedContact from "@/components/FixedContact";
import PurchaseTermsModal from "@/components/PurchaseTermsModal";

// Utility function to convert any YouTube URL to an embed URL with highest available quality
function getYouTubeEmbedUrl(url: string): string {
  const baseParams =
    "enablejsapi=1&vq=hd2160&rel=0&modestbranding=1&showinfo=0";

  // Handle youtu.be short links
  const shortMatch = url.match(/^https?:\/\/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?${baseParams}`;
  }
  // Handle standard YouTube links (watch?v=)
  const longMatch = url.match(/[?&]v=([^?&]+)/);
  if (longMatch) {
    return `https://www.youtube.com/embed/${longMatch[1]}?${baseParams}`;
  }
  // Handle shorts links
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}?${baseParams}`;
  }
  // Handle /embed/ links directly
  if (url.includes("/embed/")) {
    const separator = url.includes("?") ? "&" : "?";
    return url.includes("enablejsapi=1") ? url : url + separator + baseParams;
  }
  // Fallback: return original
  return url;
}

/**
 * Asset detail page component
 * Displays detailed information about a specific asset with video player and payment options
 * Features like functionality, video controls, and automatic download after payment
 */
export default function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const details = weddingInvitationDetails.find(
    (item) => item.id === Number(resolvedParams.id)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [showToast, setShowToast] = useState(false);
  // Modal state
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [triggerPayment, setTriggerPayment] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [formError, setFormError] = useState("");

  if (!details) {
    notFound();
  }

  const togglePlay = () => {
    if (!isPlaying) setIsPlaying(true);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] text-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] backdrop-blur-md border-b border-purple-900/40 h-16 shadow-2xl">
        <div className="container mx-auto px-4 py-3 h-16 flex items-center">
          <div className="flex items-center justify-between w-full">
            <Link
              href="/"
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Assets</span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={clsx(
                  "p-2 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300",
                  isLiked
                    ? "text-pink-500 bg-pink-50"
                    : "text-gray-600 hover:text-pink-500"
                )}
                aria-label="Like this asset"
              >
                <Heart
                  className={clsx(
                    "w-5 h-5 transition-all",
                    isLiked ? "fill-current scale-110" : ""
                  )}
                />
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
            <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 overflow-hidden relative group">
              {details.imageUrl && details.videoUrl && (
                <div className="relative w-full aspect-video group">
                  {/* Show image + button before play */}
                  {!isPlaying ? (
                    <>
                      <Image
                        src={details.imageUrl}
                        alt={details.title}
                        fill
                        className="object-cover rounded-2xl z-0"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                        <button
                          onClick={togglePlay}
                          className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                          aria-label="Play video"
                        >
                          <Play className="w-10 h-10 text-white" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <iframe
                      ref={videoRef}
                      src={`${getYouTubeEmbedUrl(
                        details.videoUrl
                      )}&autoplay=1&controls=1&playsinline=1&modestbranding=1&rel=0&vq=hd1080`}
                      className="absolute inset-0 w-full h-full rounded-2xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <div className="bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-8 flex flex-col items-center text-center gap-6 h-full justify-center">
              <h1 className="text-3xl font-extrabold text-white leading-tight drop-shadow-lg">
                {details.title}
              </h1>
              <div className="flex flex-wrap font-bold items-center justify-center gap-3">
                <p>
                  Every Purchase Inspires us to create more and share even
                  better projects with you
                </p>
              </div>
              {details.price && (
                <div className="w-full flex flex-col items-center">
                  <div className="flex items-center justify-center mb-4 w-full">
                    <span className="text-4xl font-bold text-white drop-shadow">
                      ₹{details.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {/* User Details Form */}
                  <div className="w-full max-w-[600px] flex flex-col gap-2 mb-4">
                    <div className="flex items-center mb-1 text-xs text-blue-300">
                      <span className="mr-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                          <line
                            x1="12"
                            y1="8"
                            x2="12"
                            y2="12"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle cx="12" cy="16" r="1" fill="currentColor" />
                        </svg>
                      </span>
                      We use this info for a ₹1,00,000 giveaway.
                    </div>
                    <input
                      type="email"
                      className="px-4 py-2 rounded-lg text-black"
                      placeholder="Email*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      className="px-4 py-2 rounded-lg text-black"
                      placeholder="Phone*"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="px-4 py-2 rounded-lg text-black"
                      placeholder="City*"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                    {formError && (
                      <div className="text-red-400 text-sm">{formError}</div>
                    )}
                  </div>
                  <RazorpayCheckoutButton
                    amount={details.price}
                    assetId={details.id.toString()}
                    title={details.title}
                    email={email}
                    phone={phone}
                    city={city}
                    onPaymentSuccess={() => {
                      setShowToast(true);
                      if (downloadRef.current) {
                        downloadRef.current.click();
                      }
                      setTimeout(() => setShowToast(false), 2500);
                    }}
                    // Only trigger payment if triggerPayment is true
                    triggerPayment={triggerPayment}
                    onTriggerHandled={() => setTriggerPayment(false)}
                    // Hide the default button, we will show our own
                    hideButton
                  />
                  <button
                    className="w-full max-w-[600px] py-2 rounded-lg font-bold transition-colors text-white bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg hover:from-pink-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    onClick={() => {
                      // Validate fields before showing terms modal
                      if (!email || !phone || !city) {
                        setFormError("All fields are required.");
                        return;
                      }
                      // Basic email and phone validation
                      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                        setFormError("Please enter a valid email address.");
                        return;
                      }
                      if (!/^\d{10}$/.test(phone)) {
                        setFormError(
                          "Please enter a valid 10-digit phone number."
                        );
                        return;
                      }
                      setFormError("");
                      setShowTermsModal(true);
                    }}
                  >
                    Buy Now
                  </button>
                  {/* Hidden anchor for programmatic download */}
                  <a
                    href={details.downloadUrl}
                    download
                    ref={downloadRef}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 text-transparent bg-clip-text">
              Project Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Base features - common for all projects */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                <span className="text-white text-base">
                  Complete Pre Rendered Elements
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                <span className="text-white text-base">
                  Video Help File Included
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                <span className="text-white text-base">
                  Works in Adobe Premiere Pro CC 2015 and Above
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                <span className="text-white text-base">
                  Video Orientation is Vertical
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                <span className="text-white text-base">
                  Well Organized and Easy to Use
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                <span className="text-white text-base">
                  No Plugins Required
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                <span className="text-white text-base">
                  Very Easy to Customize
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                <span className="text-white text-base">
                  Placeholders Formats - PSD, JPG, PNG
                </span>
              </div>

              {/* Dynamic features from data */}
              {details.features &&
                details.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg shadow-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-pink-400 mt-2"></div>
                    <span className="text-white text-base">{feature}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Payment successful! Downloading your file..</span>
        </div>
      )}

      {/* Purchase Terms Modal */}
      <PurchaseTermsModal
        open={showTermsModal}
        onClose={() => {
          setShowTermsModal(false);
          setTermsChecked(false);
        }}
        onAccept={() => {
          setShowTermsModal(false);
          setTermsChecked(false);
          setTimeout(() => setTriggerPayment(true), 100); // trigger Razorpay
        }}
        checked={termsChecked}
        onCheck={setTermsChecked}
      />

      {/* Fixed Contact Card with Icons */}
      <FixedContact />

      {/* Footer */}
      <footer className="w-full text-center py-4 text-sm text-blue-200">
        Powered by <span className="font-bold text-pink-400">@Nexzap</span>
      </footer>
    </div>
  );
}
