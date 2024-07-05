/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["res.cloudinary.com"],
    // domains: ["media.es.wired.com", "placehold.co", "res.cloudinary.com"],
    //allow all domains
    // remotePatterns: [
    //   {
    //     hostname: "**",
    //   },
    // ],
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
    ],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  
};

export default nextConfig;
