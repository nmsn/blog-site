import type { ReadTimeResults } from 'reading-time'
import { allAuthors as rawAllAuthors, allPosts as rawAllPosts } from 'content-collections'

export type TocItem = {
  value: string
  url: string
  depth: number
}

export type Toc = TocItem[]

export type Post = {
  _meta: {
    filePath: string
    fileName: string
    directory: string
    path: string
    extension: string
  }
  content: string
  title: string
  date: string
  tags: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors: string[]
  layout?: string
  bibliography?: string
  canonicalUrl?: string
  body: string
  slug: string
  path: string
  filePath: string
  readingTime: ReadTimeResults
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
    author?: Array<{
      '@type': string
      name: string
    }>
  }
}

export type Author = {
  _meta: {
    filePath: string
    fileName: string
    directory: string
    path: string
    extension: string
  }
  content: string
  name: string
  avatar?: string
  occupation?: string
  company?: string
  email?: string
  twitter?: string
  bluesky?: string
  linkedin?: string
  github?: string
  layout?: string
  body: string
  slug: string
  filePath: string
}

export const allPosts = rawAllPosts as Post[]
export const allAuthors = rawAllAuthors as Author[]
