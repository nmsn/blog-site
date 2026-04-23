# NMSN Blog

Personal blog about frontend development, indie projects, design explorations, and life notes.

## Tech Stack

- [Next.js](https://nextjs.org/) with App Router + React Server Components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [content-collections](https://www.content-collections.dev/) to manage markdown content
- [MDX](https://mdxjs.com/) for writing with JSX support

## Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Writing Posts

Create a new `.mdx` file in `data/blog/`. Frontmatter fields:

```yaml
---
title: 'Post Title'
date: '2024-01-01'
tags: ['tag1', 'tag2']
summary: 'A brief description of the post.'
---
```

## Deployment

Deployed automatically on Vercel. Push to main branch to trigger a new build.

## License

MIT
