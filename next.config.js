/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'media.istockphoto.com', 'encrypted-tbn0.gstatic.com'],
  },
  // Basic SEO optimization
  poweredByHeader: false,
}

module.exports = nextConfig 