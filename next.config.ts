import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 480 fits a ~200px gallery tile on a 2x screen without jumping to 640
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
  },
};

export default nextConfig;
