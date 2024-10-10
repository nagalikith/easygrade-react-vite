const API_URL = 'http://127.0.0.1:5000'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [

      {
          protocol: 'https',
          hostname: '*.googleusercontent.com'
      }, 
      {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com'
      }]
  },
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${API_URL}/:path*`,
        },
      ]
    }
}
export default nextConfig;
