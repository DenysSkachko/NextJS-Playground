import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yanfjrlafpkrvgsikbnz.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
