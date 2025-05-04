import { FiEye } from 'react-icons/fi';

// Function to fetch view counts from the Umami API
// This runs ONLY during the build process on the server
async function fetchUmamiPageViews(slug: string): Promise<number> {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiApiKey = process.env.UMAMI_API_KEY;
  const umamiApiEndpoint = "https://us.umami.is"; // Use the correct endpoint (e.g., us.umami.is or eu.umami.is)
  const blogPath = `/blog/${slug}`;

  if (!websiteId || !umamiApiKey) {
    console.warn('Umami environment variables not set. Skipping view fetch.');
    return 0;
  }

  try {
    const url = `${umamiApiEndpoint}/api/websites/${websiteId}/pageviews?url=${encodeURIComponent(blogPath)}&unit=day&limit=1`; // Limit=1 might not be needed depending on API version/needs
    
    console.log(`Fetching Umami views for: ${blogPath} from ${url}`); // Log for debugging build

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${umamiApiKey}`,
        'Content-Type': 'application/json',
      },
      // Use Next.js caching/revalidation if desired
      // next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      console.error(`Umami API error for ${blogPath}: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error(`Umami error body: ${errorBody}`);
      return 0;
    }

    const data = await response.json();
    
    // Adjust based on the actual API response structure 
    // Example: Assuming response is { pageviews: [{count: 123}, ...] } or similar
    // Check the Umami API docs for the exact structure of /pageviews endpoint
    const count = data?.pageviews?.[0]?.count || data?.count || 0; 
    console.log(`Umami views received for ${blogPath}: ${count}`);
    return Number(count);

  } catch (error) {
    console.error(`Error fetching Umami views for ${blogPath}:`, error);
    return 0; // Return 0 on error
  }
}

// Async Server Component to display the view count
const ViewCounter = async ({ slug }: { slug: string }) => {
  const viewCount = await fetchUmamiPageViews(slug);

  return (
    <span className="flex items-center">
      <FiEye className="mr-1.5 h-4 w-4" />
      <span>{viewCount.toLocaleString()}</span>
    </span>
  );
};

export default ViewCounter; 