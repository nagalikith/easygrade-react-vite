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
    }, 
    webpack: (config) => {
      /**
       * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
       * Module parse failed: Unexpected character '�' (1:0)" error
       */
      config.resolve.alias.canvas = false;
  
      return config;
    },
}
export default nextConfig;
