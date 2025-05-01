import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://onkaryaglewad.in' // Replace with your domain if different

  // Add your static page routes
  const staticRoutes = [
    '/',
    '/about',
    '/education',
    '/experience',
    '/skills',
    '/media',
    '/connect',
    // Add other static pages if any
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const, // Or 'weekly', 'yearly', 'always', 'hourly', 'daily', 'never'
    priority: route === '/' ? 1 : 0.8, // Home page higher priority
  }));

  // Add dynamic routes if you have any (e.g., blog posts, project details)
  // const dynamicRoutes = ...

  return [
    ...staticRoutes,
    // ...dynamicRoutes,
  ];
} 