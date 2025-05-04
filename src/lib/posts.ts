import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Define the expected structure of post data including new fields
export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string; // Or excerpt, ensure consistency
  image?: string;
  tags?: string[]; // Added tags
  readingTime?: number; // Added reading time (in minutes)
  contentHtml?: string; // Added for single post page
  [key: string]: any; // Allow other frontmatter properties
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ""); // Strip HTML tags
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /content/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Ensure we only read markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Calculate reading time
      const readingTime = calculateReadingTime(matterResult.content);

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title || "Untitled Post",
        date: matterResult.data.date || new Date().toISOString(),
        summary: matterResult.data.summary || "",
        image: matterResult.data.image || null,
        tags: matterResult.data.tags || [], // Read tags, default to empty array
        readingTime, // Add reading time
        ...(matterResult.data as { [key: string]: any }), // Spread other data
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Calculate reading time
  const readingTime = calculateReadingTime(matterResult.content);

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    title: matterResult.data.title || "Untitled Post",
    date: matterResult.data.date || new Date().toISOString(),
    summary: matterResult.data.summary || "",
    image: matterResult.data.image || null,
    tags: matterResult.data.tags || [], // Read tags
    readingTime, // Add reading time
    ...(matterResult.data as { [key: string]: any }),
  };
} 