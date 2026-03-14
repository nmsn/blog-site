import type { Author, Post } from './collections'

const isProduction = process.env.NODE_ENV === 'production'

type WithoutContent<T> = Omit<T, 'body' | 'content'>

export type CoreContent<T> = WithoutContent<T>
export type CorePost = CoreContent<Post>
export type CoreAuthor = CoreContent<Author>

export function sortPosts<T extends { date: string }>(posts: T[]) {
  return [...posts].sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
}

export function coreContent<T extends { body?: unknown; content?: unknown }>(
  content: T
): CoreContent<T> {
  const { body: _body, content: _content, ...rest } = content
  return rest as CoreContent<T>
}

export function allCoreContent<T extends { draft?: boolean; body?: unknown; content?: unknown }>(
  contents: T[]
) {
  const coreContents = contents.map((content) => coreContent(content))
  if (isProduction) {
    return coreContents.filter((content) => !('draft' in content && content.draft === true))
  }
  return coreContents
}

export function getPublishedPosts(posts: Post[]) {
  return posts.filter((post) => !(isProduction && post.draft))
}
