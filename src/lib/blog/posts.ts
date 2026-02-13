/**
 * File: src/lib/blog/posts.ts
 * Module: lib/blog
 * Purpose: Blog post retrieval and management
 * Author: Aman Sharma / Novologic / Cursor AI
 * Created: 2026-02-13
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseMarkdown } from './parse';
import readingTime from 'reading-time';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  keywords?: string[];
  author?: string;
  tags?: string[];
  content: string; // HTML content
  readingTime: string;
  rawContent?: string; // Markdown content (optional if needed)
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = data.slug || file.replace(/\.md$/, '');
    const htmlContent = await parseMarkdown(content);
    const readTime = readingTime(content).text;

    posts.push({
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      image: data.image,
      keywords: data.keywords,
      author: data.author,
      tags: data.tags,
      content: htmlContent,
      readingTime: readTime,
      rawContent: content,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  return post || null;
}
