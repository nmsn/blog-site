import { defineCollection, defineConfig, type Meta } from '@content-collections/core'
import { compileMDX, type Options as MdxOptions } from '@content-collections/mdx'
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
import { z } from 'zod'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import remarkGfm from 'remark-gfm'
import { remarkAlert } from 'remark-github-blockquote-alert'
import {
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
  type Toc,
} from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

const sortPosts = <T extends { date: string }>(posts: T[]) =>
  [...posts].sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))

const createTagCount = (posts: Array<{ draft?: boolean; tags?: string[] }>) => {
  const tagCount: Record<string, number> = {}

  posts.forEach((post) => {
    if (post.draft && isProduction) return
    post.tags?.forEach((tag) => {
      const formattedTag = slug(tag)
      tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1
    })
  })

  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount, null, 2))
}

const createSearchIndex = (
  posts: Array<{
    draft?: boolean
    title: string
    summary?: string
    tags?: string[]
    date: string
    path: string
    slug: string
  }>
) => {
  if (
    siteMetadata?.search?.provider !== 'kbar' ||
    !siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    return
  }

  const searchDocuments = sortPosts(
    posts
      .filter((post) => !(isProduction && post.draft))
      .map(({ title, summary, tags, date, path, slug }) => ({
        title,
        summary,
        tags,
        date,
        path,
        slug,
      }))
  )

  writeFileSync(
    `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
    JSON.stringify(searchDocuments)
  )
}

const mdxOptions: MdxOptions = {
  remarkPlugins: [remarkGfm, remarkCodeTitles, remarkImgToJsx, remarkAlert],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'prepend',
        headingProperties: {
          className: ['content-header'],
        },
        content: icon,
      },
    ],
    [rehypeCitation, { path: path.join(root, 'data') }],
    [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
    rehypePresetMinify,
  ],
}

const postSchema = z.object({
  content: z.string(),
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  lastmod: z.string().optional(),
  draft: z.boolean().optional(),
  summary: z.string().optional(),
  images: z.array(z.string()).optional(),
  authors: z.array(z.string()).default(['default']),
  layout: z.string().optional(),
  bibliography: z.string().optional(),
  canonicalUrl: z.string().optional(),
})

type PostDocument = z.infer<typeof postSchema> & {
  _meta: Meta
}

type PostTransformed = PostDocument & {
  body: string
  slug: string
  path: string
  filePath: string
  readingTime: ReturnType<typeof readingTime>
  toc: Toc
  structuredData: {
    '@context': string
    '@type': string
    headline: string
    datePublished: string
    dateModified: string
    description?: string
    image?: string
    url: string
  }
}

const posts = defineCollection({
  name: 'posts',
  directory: 'data/blog',
  include: '**/*.mdx',
  schema: postSchema,
  transform: async (document, context): Promise<PostTransformed> => {
    const body = await compileMDX(context, document, mdxOptions)
    const toc = await extractTocHeadings(document.content)
    const slugValue = document._meta.path
    const pathValue = `blog/${slugValue}`

    return {
      _meta: document._meta,
      content: document.content,
      title: document.title,
      date: document.date,
      tags: document.tags,
      lastmod: document.lastmod,
      draft: document.draft,
      summary: document.summary,
      images: document.images,
      authors: document.authors,
      layout: document.layout,
      bibliography: document.bibliography,
      canonicalUrl: document.canonicalUrl,
      body,
      slug: slugValue,
      path: pathValue,
      filePath: `blog/${document._meta.filePath}`,
      readingTime: readingTime(document.content),
      toc,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: document.title,
        datePublished: document.date,
        dateModified: document.lastmod || document.date,
        description: document.summary,
        image: document.images ? document.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${pathValue}`,
      },
    }
  },
  onSuccess: (documents) => {
    createTagCount(documents)
    createSearchIndex(documents)
  },
})

const authorSchema = z.object({
  content: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  occupation: z.string().optional(),
  company: z.string().optional(),
  email: z.string().optional(),
  twitter: z.string().optional(),
  bluesky: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  layout: z.string().optional(),
})

type AuthorDocument = z.infer<typeof authorSchema> & {
  _meta: Meta
}

type AuthorTransformed = AuthorDocument & {
  body: string
  slug: string
  filePath: string
}

const authors = defineCollection({
  name: 'authors',
  directory: 'data/authors',
  include: '**/*.mdx',
  schema: authorSchema,
  transform: async (document, context): Promise<AuthorTransformed> => ({
    _meta: document._meta,
    content: document.content,
    name: document.name,
    avatar: document.avatar,
    occupation: document.occupation,
    company: document.company,
    email: document.email,
    twitter: document.twitter,
    bluesky: document.bluesky,
    linkedin: document.linkedin,
    github: document.github,
    layout: document.layout,
    body: await compileMDX(context, document, mdxOptions),
    slug: document._meta.path,
    filePath: `authors/${document._meta.filePath}`,
  }),
})

export default defineConfig({
  content: [posts, authors] as any,
})
