/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = 'onkaryaglewad.in';

const nextConfig = {
  output: 'export',
  
  // Configure basePath and assetPrefix for GitHub Pages deployment
  basePath: isGithubActions ? `/${repo}` : '',
  assetPrefix: isGithubActions ? `/${repo}/` : '',
  
  // Required for static export
  images: {
    unoptimized: true,
  },
  
  // Required for GitHub Pages compatibility in Next.js 13+
  trailingSlash: true,
};

export default nextConfig;
