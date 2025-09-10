'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';

/**
 * Inter font configuration for consistent typography
 */
const inter = Inter({ subsets: ['latin'] });

/**
 * Root layout component
 * Provides the main HTML structure with authentication and navigation
 * Wraps all pages with ClerkProvider for user authentication
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" id="tenant-manifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Essential SEO Meta Tags */}
        <title>VR Visual Magics - Premium Wedding Invitation Videos & Templates</title>
        <meta name="description" content="VR Visual Magics offers premium wedding invitation videos and templates. Create stunning, customizable wedding invitations with high-quality designs for your special day. Download beautiful wedding video templates instantly." />
        <meta name="keywords" content="VR Visual Magics, vrvisualmagics, wedding invitation videos, wedding templates, wedding video design, premium wedding invitations, customizable wedding videos, wedding invitation maker, digital wedding invitations" />
        <meta name="author" content="VR Visual Magics" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Brand and Business Information */}
        <meta name="application-name" content="VR Visual Magics" />
        <meta name="apple-mobile-web-app-title" content="VR Visual Magics" />
        <meta name="msapplication-TileColor" content="#18122B" />
        <meta name="theme-color" content="#18122B" />
        
        {/* Open Graph for Social Media */}
        <meta property="og:title" content="VR Visual Magics - Premium Wedding Invitation Videos & Templates" />
        <meta property="og:description" content="VR Visual Magics offers premium wedding invitation videos and templates. Create stunning, customizable wedding invitations with high-quality designs for your special day." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vrvisualmagics.com" />
        <meta property="og:site_name" content="VR Visual Magics" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://vrvisualmagics.com/images/banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="VR Visual Magics - Premium Wedding Invitation Videos" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VR Visual Magics - Premium Wedding Invitation Videos & Templates" />
        <meta name="twitter:description" content="VR Visual Magics offers premium wedding invitation videos and templates. Create stunning, customizable wedding invitations." />
        <meta name="twitter:image" content="https://vrvisualmagics.com/images/banner.png" />
        <meta name="twitter:image:alt" content="VR Visual Magics - Premium Wedding Invitation Videos" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://vrvisualmagics.com" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://vrvisualmagics.com/#website",
                  "url": "https://vrvisualmagics.com",
                  "name": "VR Visual Magics",
                  "alternateName": ["vrvisualmagics", "VR Visual", "Visual Magics"],
                  "description": "Premium wedding invitation videos and templates for your special day",
                  "publisher": {
                    "@id": "https://vrvisualmagics.com/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://vrvisualmagics.com/?search={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "Organization",
                  "@id": "https://vrvisualmagics.com/#organization",
                  "name": "VR Visual Magics",
                  "alternateName": ["vrvisualmagics", "VR Visual", "Visual Magics"],
                  "url": "https://vrvisualmagics.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://vrvisualmagics.com/images/banner.png",
                    "width": 1200,
                    "height": 630
                  },
                  "description": "VR Visual Magics specializes in premium wedding invitation videos and templates. We offer high-quality, customizable designs for weddings and special occasions.",
                  "foundingDate": "2020",
                  "knowsAbout": [
                    "Wedding Invitation Videos",
                    "Wedding Templates",
                    "Digital Invitations",
                    "Video Design",
                    "Wedding Graphics"
                  ],
                  "serviceArea": {
                    "@type": "Place",
                    "name": "Worldwide"
                  },
                  "areaServed": "Worldwide",
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Wedding Invitation Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Premium Wedding Invitation Videos",
                          "description": "High-quality wedding invitation video templates"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Customizable Wedding Templates",
                          "description": "Personalized wedding invitation templates"
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": "https://vrvisualmagics.com/#webpage",
                  "url": "https://vrvisualmagics.com",
                  "name": "VR Visual Magics - Premium Wedding Invitation Videos & Templates",
                  "isPartOf": {
                    "@id": "https://vrvisualmagics.com/#website"
                  },
                  "about": {
                    "@id": "https://vrvisualmagics.com/#organization"
                  },
                  "description": "VR Visual Magics offers premium wedding invitation videos and templates. Create stunning, customizable wedding invitations with high-quality designs for your special day.",
                  "breadcrumb": {
                    "@id": "https://vrvisualmagics.com/#breadcrumb"
                  },
                  "inLanguage": "en-US"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] min-h-screen`} style={{ margin: 0 }}>
        <ClerkProvider>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
