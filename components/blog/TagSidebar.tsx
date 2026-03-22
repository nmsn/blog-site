'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
import tagData from 'app/tag-data.json'

export default function TagSidebar() {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <aside className="hidden lg:block lg:w-[260px] lg:flex-none">
      <div className="sticky top-0 border border-black/12 bg-white px-5 py-5 dark:border-white/15 dark:bg-black">
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
  )
}
