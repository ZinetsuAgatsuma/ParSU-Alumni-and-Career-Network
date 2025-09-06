/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
    devIndicators: {
      buildActivity: false,
    },
  images: {
    unoptimized: true,
  },  
}

export default nextConfig
