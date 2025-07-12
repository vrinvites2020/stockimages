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
        <meta name="description" content="Discover stunning wedding invitation videos and templates at VR Visual Magics. High-quality, customizable designs for your special day." />
        <meta name="keywords" content="wedding invitation videos, wedding templates, VR Visual Magics, wedding video design" />
        <meta name="author" content="VR Visual Magics" />
        
        {/* Open Graph for Social Media */}
        <meta property="og:title" content="VR Visual Magics - Premium Wedding Invitation Videos & Templates" />
        <meta property="og:description" content="Discover stunning wedding invitation videos and templates at VR Visual Magics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vrvisualmagics.com" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://vrvisualmagics.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "VR Visual Magics",
              "url": "https://vrvisualmagics.com",
              "description": "Premium wedding invitation videos and templates",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vrvisualmagics.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
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
