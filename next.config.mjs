/** @type {import('next').NextConfig} */

// For custom domains, we don't need basePath or assetPrefix
// The CNAME file in the repository root tells GitHub Pages to use the custom domain
const nextConfig = {
  output: 'export',
  
  // No basePath or assetPrefix needed for custom domain
  basePath: '',
  assetPrefix: '',
  
  // Required for static export
  images: {
    unoptimized: true,
  },
  
  // Required for GitHub Pages compatibility in Next.js 13+
  trailingSlash: true,
};

export default nextConfig;
