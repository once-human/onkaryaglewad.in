/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === 'production';
const repoName = "onkaryaglewad.in"; // Your GitHub repo name

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  images: {
    unoptimized: true, // Required for static export
  },
  // This is needed for GitHub Pages to work with Next.js 13+
  trailingSlash: true,
};

export default nextConfig;
