/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next 16 default is [75]; we use quality={100} on showcase images.
    qualities: [75, 100],
  },
}

export default nextConfig
