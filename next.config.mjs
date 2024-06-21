/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.es.wired.com", "placehold.co"],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
};

export default nextConfig;
