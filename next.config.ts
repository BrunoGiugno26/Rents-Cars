/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "utfs.io", // dominio que usa Uploadthing
      },
    ],
  },
};

export default nextConfig;

