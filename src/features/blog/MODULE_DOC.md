# Blog Module Documentation

## Purpose
The Blog module manages the presentation and interaction of blog content. It serves to inform devotees and visitors about news, events, spiritual articles, and updates related to the Sansthan.

## Key Components

### BlogCard
- **Path**: `src/features/blog/components/BlogCard.tsx`
- **Purpose**: Displays a summary of a blog post in a grid or list view.
- **Props**: `post: BlogPost`
- **Features**: Displays title, date, reading time, description, tags, and a link to the full article.

### BlogContent
- **Path**: `src/features/blog/components/BlogContent.tsx`
- **Purpose**: Renders the rich text content of a blog post.
- **Features**: Uses Tailwind Typography (`prose`) for styling HTML content derived from Markdown.

## Data Flow
- **Source**: Markdown files in `content/blog/`.
- **Parsing**: `src/lib/blog` handles parsing of frontmatter and markdown content.
- **Pages**:
  - `/blog`: Lists all posts using `getBlogPosts()`.
  - `/blog/[slug]`: Displays a single post using `getBlogPost(slug)`.

## Changelog
- **2026-02-13**: Initial module creation with BlogCard and BlogContent components.
