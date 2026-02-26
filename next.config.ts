import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.kanisius.dev' }],
        destination: 'https://kanisius.dev/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
