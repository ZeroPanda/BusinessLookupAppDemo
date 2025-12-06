import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Note: `eslint.ignoreDuringBuilds` in next.config.ts is no longer supported in Next 16.
  // If you still want to skip linting in CI or builds, consider running `next lint` separately
  // or use a linting pipeline that doesn't fail builds.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
