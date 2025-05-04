import { getSortedPostsData, PostData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { Metadata } from 'next';
import { FaRegClock } from "react-icons/fa";
import { FaTags } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Blog | Onkar Yaglewad",
  description: "A collection of my thoughts, learnings, and articles.",
};

export default function Blog() {
  const posts = getSortedPostsData();

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 text-center md:mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4">
          A collection of my thoughts, learnings, and articles.
        </p>
      </div>

      <div className={`mt-12 ${posts.length === 1 ? 'flex justify-center' : 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}`}>
        {posts.map(({ slug, title, date, summary, image, readingTime, tags }) => (
          <div key={slug} className={posts.length === 1 ? 'w-full max-w-md' : ''}>
            <Link
              href={`/blog/${slug}`}
              className="group flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm 
                         transition-all duration-300 ease-in-out 
                         hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600 hover:scale-[1.03]"
            >
              {image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={`${title} cover image`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(date)}
                  </p>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-300 line-clamp-3">
                    {summary}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                  {readingTime && readingTime > 0 && (
                    <div className="flex items-center">
                      <FaRegClock className="mr-1.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span>{readingTime} min read</span>
                    </div>
                  )}
                  {tags && tags.length > 0 && (
                     <div className="flex items-center flex-shrink min-w-0">
                       <FaTags className="mr-1.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                       <span className="leading-snug">{tags.join(', ')}</span>
                     </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
} 