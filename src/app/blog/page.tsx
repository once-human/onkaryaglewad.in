import { getSortedPostsData, PostData } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import { FiHeart, FiEye } from 'react-icons/fi';
import ViewCounter from '@/components/ViewCounter';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts and articles.',
};

// Trivial comment added to trigger rebuild
const BlogCard = ({ post }: { post: PostData }) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-700/50 bg-gray-800/50 shadow-lg transition-all duration-300 ease-in-out hover:border-gray-600 hover:shadow-xl hover:scale-[1.02]">
        <div className="relative h-48 w-full">
          <Image
            src={post.image}
            alt={`${post.title} cover image`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-grow flex-col p-5">
          <h2 className="mb-2 text-xl font-semibold text-gray-100 transition-colors duration-300 group-hover:text-primary-400">
            {post.title}
          </h2>
          <p className="mb-3 text-sm text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="mb-4 flex-grow text-gray-300 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center space-x-4 pt-2 text-sm text-gray-500">
            <Suspense fallback={
              <span className="flex items-center">
                <FiEye className="mr-1.5 h-4 w-4" />
                <span>...</span>
              </span>
            }>
              <ViewCounter slug={post.slug} />
            </Suspense>
            
            <span className="flex items-center">
              <FiHeart className="mr-1.5 h-4 w-4" />
              <span>--</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div>
      <section key="Blog">
        <SectionTitle
          title="Blog"
          subTitle="A collection of my thoughts, learnings, and articles."
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {allPostsData.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
} 