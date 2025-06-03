import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const recentDownloads = [
  { name: "Tanvi", place: "Chennai", image: "/images/girl10.jpg" },
  { name: "Aditya", place: "Bengaluru", image: "/images/boy12.jpg" },
  { name: "Suryateja", place: "Warangal", image: "/images/boy1.jpg" },
  { name: "Jayaram", place: "Vijayawada", image: "/images/girl1.jpg" },
  { name: "Rakesh", place: "Hyderabad", image: "/images/boy9.jpg" },
  { name: "Niharika", place: "Mumbai", image: "/images/girl8.jpg" },
  { name: "Yashwanth", place: "Khammam", image: "/images/boy4.jpg" },
  { name: "Divya", place: "Nizamabad", image: "/images/girl2.jpg" },
  { name: "Karthik", place: "Nalgonda", image: "/images/boy8.jpg" },
  { name: "Bhavana", place: "Karimnagar", image: "/images/girl6.jpg" },
  { name: "Naveen", place: "Guntur", image: "/images/boy11.jpg" },
  { name: "Meghana", place: "Warangal", image: "/images/girl3.jpg" },
  { name: "Tejesh", place: "Adilabad", image: "/images/boy6.jpg" },
  { name: "Anirudh", place: "Siddipet", image: "/images/boy7.jpg" },
  { name: "Harshita", place: "Hyderabad", image: "/images/girl5.jpg" },
  { name: "Manohar", place: "Nizamabad", image: "/images/boy3.jpg" },
  { name: "Rithvik", place: "Karimnagar", image: "/images/boy2.jpg" },
  { name: "Sravya", place: "Khammam", image: "/images/girl4.jpg" },
  { name: "Anusha", place: "Rajahmundry", image: "/images/girl7.jpg" },
  { name: "Vishnu", place: "Vijayawada", image: "/images/boy10.jpg" },
  { name: "Ishita", place: "Delhi", image: "/images/girl9.jpg" },
  { name: "Sai Kiran", place: "Mahbubnagar", image: "/images/boy5.jpg" },
];

export default function RecentDownloads() {
  const [trackWidth, setTrackWidth] = useState(0);
  const originalSetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationDuration = 40; // seconds

  useEffect(() => {
    const updateTrackWidth = () => {
      if (originalSetRef.current) {
        setTrackWidth(originalSetRef.current.getBoundingClientRect().width);
      }
    };

    updateTrackWidth();
    const resizeObserver = new ResizeObserver(updateTrackWidth);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Animation variants for framer-motion
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#1a1325] to-[#2a2040] relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-purple-900/20 blur-3xl -z-0" />
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-pink-900/20 blur-3xl -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          Recent Downloads
        </motion.h2>

        <div
          ref={containerRef}
          className="relative w-full flex items-center justify-center rounded-3xl py-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-purple-900/30 z-10 pointer-events-none" />

          <div className="flex gap-8 overflow-x-hidden carousel-container w-full">
            <motion.div
              className="carousel-track flex"
              style={{ width: trackWidth ? `${trackWidth * 2}px` : "auto" }}
              animate={{
                x: [0, -trackWidth],
              }}
              transition={{
                duration: animationDuration,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {/* First set */}
              <div className="flex gap-8" ref={originalSetRef}>
                {recentDownloads.map((download, idx) => (
                  <motion.div
                    key={`${download.name}-${idx}`}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center min-w-[140px] group cursor-pointer"
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/30">
                      <Image
                        src={download.image}
                        alt={download.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="96px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="mt-3 text-white font-semibold text-lg drop-shadow-lg group-hover:text-purple-300 transition-colors">
                      {download.name}
                    </span>
                    <span className="text-sm text-purple-300/80 font-medium group-hover:text-purple-200 transition-colors">
                      {download.place}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Second set for seamless loop */}
              <div className="flex gap-8">
                {recentDownloads.map((download, idx) => (
                  <div
                    key={`${download.name}-dup-${idx}`}
                    className="flex flex-col items-center min-w-[140px]"
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={download.image}
                        alt={download.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 96px"
                      />
                    </div>
                    <span className="mt-3 text-white font-semibold text-lg drop-shadow-lg">
                      {download.name}
                    </span>
                    <span className="text-sm text-purple-300/80 font-medium">
                      {download.place}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-4"
        >
          {[
            {
              title: "Save time",
              description:
                "Don't need to spend hours laboring over video design",
              icon: "⏱️",
            },
            {
              title: "Broadcast quality",
              description:
                "We build quality video templates to ensure your clients dream fulfill",
              icon: "🎬",
            },
            {
              title: "Easy Editable",
              description:
                "Our templates are super easy to use and fully Prerendered Elements",
              icon: "✏️",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-b from-purple-900/30 to-purple-900/10 p-6 rounded-2xl border border-purple-800/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-purple-300">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
