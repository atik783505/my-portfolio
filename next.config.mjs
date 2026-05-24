/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // devicons CDN (skill logos)
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/**",
      },
      // icons8 fallback icons
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      // Unsplash (in case placeholder is needed)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
