# Blog Module Documentation

## Purpose
The Blog module manages SEO-focused content clusters and the presentation of blog content. It serves to inform devotees and visitors about news, events, location guides, spiritual articles, and updates related to the Sansthan.

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
- **Source**: Markdown files in `content/blog/` (recursive folders supported; `_templates` and `README.md` are excluded from publishing).
- **Parsing**: `src/lib/blog` handles parsing of frontmatter and markdown content.
- **Pages**:
  - `/blog`: Lists all posts using `getBlogPosts()`.
  - `/blog/[slug]`: Displays a single post using `getBlogPost(slug)`.
  - `/blog/tag/[tag]`: Tag archive pages generated from blog frontmatter tags.
  - `/blog/category/[category]`: Category archive pages generated from blog frontmatter category.

## Changelog
- **2026-02-13**: Initial module creation with BlogCard and BlogContent components.
- **2026-02-15**: Added recursive markdown loading, taxonomy helpers (tags/categories), related-post engine, tag/category SEO routes, blog listing JSON-LD schema, and seeded location-intent content cluster posts for Shegaon and Omkareshwar.
