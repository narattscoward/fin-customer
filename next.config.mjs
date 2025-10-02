/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  basePath: '/app/fin-customer',
};

export default nextConfig;