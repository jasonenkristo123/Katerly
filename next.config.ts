import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`
      },
      {
        source: "/uploads/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/:path*`
      }
    ]
  },
};

export default nextConfig;
