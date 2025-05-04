import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts';
import { Metadata } from 'next';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { FaRegClock, FaTags, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from "next/navigation";

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
  try {
    const post = await getData(params.slug);
    return {
      title: `${post.title} | Blog`,
      description: post.summary,
    };
  } catch (error) {
    return {
      title: "Post Not Found",
      description: "This blog post could not be found.",
    };
  }
}

// The page component
export default async function Post({ params }: { params: { slug: string } }) {
  let post: PostData;
  try {
    post = await getData(params.slug);
  } catch (error) {
    notFound();
  }

  if (!post) {
    notFound();
  }
  
  return (
    <div className="py-8 md:py-12">
      {/* Back Button (Visible on small screens, above content) */}
      <div className="container mx-auto px-4 max-w-3xl mb-6 md:mb-8 sm:hidden"> 
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group"
        >
          <FaArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Blog
        </Link>
      </div>

      {/* Increased gap-x for more space */}
      <div className="container mx-auto flex items-start gap-x-6 md:gap-x-10 px-4">
        {/* Back Button Container (For large screens) */}
        <div className="flex-shrink-0 hidden sm:block pt-1 md:pt-2"> 
          <Link 
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 
                       transition-colors duration-200 group 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
            aria-label="Back to Blog"
          >
            <FaArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1 mr-2" />
            <span className="hidden md:inline">Back to Blog</span>
          </Link>
        </div>

        {/* Main Content Area */}
        <section className="flex-grow max-w-3xl w-full">
          <article key={post.title} className="rounded-lg overflow-hidden">
            {/* Use post.image (local path from frontmatter) */}
            {post.image && (
              <div className="relative w-full aspect-video mb-6 md:mb-8">
                <Image
                  src={post.image} // Reverted to local path
                  alt={`${post.title} cover image`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg shadow-sm"
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            )}

            <div className="p-0"> {/* Removed padding from here */}
              <header className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatDate(post.date)}</span>
                  {post.readingTime && post.readingTime > 0 && (
                    <span className="flex items-center">
                      <FaRegClock className="mr-1.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      {post.readingTime} min read
                    </span>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <FaTags className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0 mr-1" aria-hidden="true" />
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <div
                dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
                className="prose prose-lg dark:prose-invert max-w-none 
                           prose-a:text-primary-600 hover:prose-a:text-primary-700 
                           dark:prose-a:text-primary-400 dark:hover:prose-a:text-primary-300
                           prose-img:rounded-lg prose-img:shadow-sm
                           prose-headings:scroll-mt-20 prose-headings:font-semibold 
                           prose-code:before:content-[''] prose-code:after:content-['']"
              />
            </div>
          </article>
        </section>
      </div>
    </div>
  );
} 