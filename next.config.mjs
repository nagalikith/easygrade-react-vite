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
  middleware: true, // You can enable middleware if required for advanced routing.
}
export default nextConfig;
