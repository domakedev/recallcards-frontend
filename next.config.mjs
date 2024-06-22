/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["media.es.wired.com", "placehold.co", "res.cloudinary.com"],
    // domains: ["media.es.wired.com", "placehold.co", "res.cloudinary.com"],
    //allow all domains
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
};

export default nextConfig;
