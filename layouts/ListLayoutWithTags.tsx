'use client'

import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent, CorePost } from '@/lib/content'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import PageHeader from '@/components/shell/PageHeader'
import TagSidebar from '@/components/blog/TagSidebar'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<CorePost>[]
  title: string
  initialDisplayPosts?: CoreContent<CorePost>[]
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
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader title={title} className="pb-8" />

      <div className="flex gap-10 lg:gap-14">
        <TagSidebar />

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
