import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'scss')],
  },
};

export default nextConfig;
