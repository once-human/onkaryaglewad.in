import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts';
import { Metadata } from 'next';
import Image from 'next/image';
import LikeButton from '@/components/LikeButton';
import ViewCounter from '@/components/ViewCounter'; // Import the new component
import { Suspense } from 'react'; // Import Suspense
import { FiEye } from 'react-icons/fi'; // Import Eye Icon for fallback

// Generate static paths for all posts
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  // The paths look like [{ params: { slug: '...' } }, ...]
  // We just need the slug values
  return paths.map(path => ({ slug: path.params.slug }));
}

// Fetch data for a specific post
async function getData(slug: string): Promise<PostData> {
  const postData = await getPostData(slug);
  return postData;
}

// Generate metadata for the specific post page
export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const postData = await getData(params.slug);
  return {
    title: postData.title,
    description: postData.excerpt, // Use excerpt for description
  };
}

// The page component
export default async function PostPage({ params }: { params: { slug: string } }) {
  const postData = await getData(params.slug);

  return (
    <div>
      <section key={postData.title} className="py-8">
        <article className="prose prose-invert mx-auto max-w-3xl lg:prose-lg prose-img:rounded-lg">
          {/* Refined prose classes, max-width */}
          {/* Post Header */}
          <div className="mb-8 border-b border-gray-700 pb-6">
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-100 md:text-4xl lg:text-5xl">
              {/* Adjusted heading size/weight */}
              {postData.title}
            </h1>
            {/* Meta information: Date and View Count */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base text-gray-400">
              <span>
                Published on {new Date(postData.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {/* Use Suspense for the async ViewCounter component */}
              <Suspense fallback={
                <span className="flex items-center">
                  <FiEye className="mr-1.5 h-4 w-4" />
                  <span>...</span>
                </span>
              }>
                <ViewCounter slug={postData.slug} /> 
              </Suspense>
            </div>
            {postData.image && (
              <div className="relative mt-6 aspect-video w-full"> {/* Use aspect ratio */}
                <Image
                  src={postData.image}
                  alt={`${postData.title} cover image`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 896px" // Adjusted sizes based on max-w-3xl
                />
              </div>
            )}
          </div>

          {/* Post Content */}
          <div
            dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
            className="prose prose-invert max-w-none prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-primary-400 prose-a:text-secondary-400 prose-a:no-underline hover:prose-a:text-secondary-300 hover:prose-a:underline prose-strong:text-gray-200 prose-code:rounded prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-tertiary-300 prose-code:before:content-[''] prose-code:after:content-[''] prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400"
            // Added/refined more prose styles for better readability
          />

          {/* Like Button Placeholder */}
          <div className="mt-10 border-t border-gray-700 pt-6 text-center">
            <LikeButton slug={postData.slug} />
          </div>

        </article>
      </section>
    </div>
  );
} 