import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/shell/PageHeader'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <div className="mx-auto w-full max-w-5xl pb-14 md:pb-20">
      <PageHeader
        label="Index"
        title="Tags"
        description="Browse writing by topic without leaving the shell. The content area scrolls on its own so the overall frame stays pinned to the viewport."
        className="pb-8"
      />

      <div className="border border-black/6 bg-white/34 px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-sm md:px-7 md:py-7">
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {tagKeys.length === 0 && <span className="text-sm text-black/55">No tags found.</span>}
          {sortedTags.map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <Tag text={t} />
              <Link
                href={`/tags/${slug(t)}`}
                className="text-sm font-semibold text-black/58 uppercase transition-colors duration-200 hover:text-[#27A6DE]"
                aria-label={`View posts tagged ${t}`}
              >
                {`(${tagCounts[t]})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
