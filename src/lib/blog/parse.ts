/**
 * File: src/lib/blog/parse.ts
 * Module: lib/blog
 * Purpose: Markdown parsing logic using unified pipeline
 * Author: Aman Sharma / Novologic / Cursor AI
 * Created: 2026-02-13
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

/**
 * Parse markdown content to HTML string
 * @param content Raw markdown string
 * @returns Parsed HTML string
 */
export async function parseMarkdown(content: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return String(file);
}
