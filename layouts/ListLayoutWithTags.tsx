'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import PageHeader from '@/components/shell/PageHeader'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-8">
      <nav className="flex items-center justify-between border-t border-black/8 pt-6 text-sm text-black/55">
        {!prevPage ? (
          <button className="cursor-auto disabled:opacity-50" disabled>
            Previous
          </button>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="transition-colors duration-200 hover:text-[#27A6DE]"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage ? (
          <button className="cursor-auto disabled:opacity-50" disabled>
            Next
          </button>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="transition-colors duration-200 hover:text-[#27A6DE]"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="mx-auto w-full max-w-6xl pb-14 md:pb-20">
      <PageHeader title={title} className="pb-8" />

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
        <aside className="hidden lg:block lg:w-[260px] lg:flex-none">
          <div className="sticky top-6 max-h-[calc(100dvh-7rem)] overflow-auto border border-black/12 bg-white px-5 py-5 [scrollbar-color:rgba(0,0,0,0.12)_transparent] [scrollbar-width:thin] dark:border-white/15 dark:bg-black dark:[scrollbar-color:rgba(255,255,255,0.14)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="px-1">
              {pathname.startsWith('/blog') ? (
                <h3 className="text-primary-500 text-xs font-bold tracking-[0.12em] uppercase">
                  All Posts
                </h3>
              ) : (
                <Link
                  href="/blog"
                  className="text-xs font-bold tracking-[0.12em] text-black/72 uppercase transition-colors duration-200 hover:text-[#27A6DE] dark:text-white/72"
                >
                  All Posts
                </Link>
              )}
              <ul className="mt-4">
                {sortedTags.map((tag) => {
                  const isActive = decodeURI(pathname.split('/tags/')[1] || '') === slug(tag)

                  return (
                    <li key={tag} className="my-3">
                      {isActive ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${tag} (${tagCounts[tag]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(tag)}`}
                          className="px-3 py-2 text-sm font-medium text-black/66 uppercase transition-colors duration-200 hover:text-[#27A6DE] dark:text-white/66"
                          aria-label={`View posts tagged ${tag}`}
                        >
                          {`${tag} (${tagCounts[tag]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 pb-4">
          <ul className="divide-y divide-black/10 dark:divide-white/12">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post

              return (
                <li key={path} className="py-7 first:pt-2">
                  <article className="flex flex-col gap-3 xl:gap-4">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm leading-6 font-medium tracking-[0.04em] text-black/55 uppercase dark:text-white/55">
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>

                    <div className="space-y-3">
                      <div>
                        <h2 className="text-3xl leading-tight font-semibold tracking-tight text-black dark:text-white">
                          <Link
                            href={`/${path}`}
                            className="transition-colors duration-200 hover:text-[#27A6DE]"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="mt-3 flex flex-wrap">
                          {tags?.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>

                      <div className="prose max-w-none text-black/72 dark:text-white/72">
                        {summary}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>

          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
