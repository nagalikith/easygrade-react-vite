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
  }
}
export default nextConfig;
