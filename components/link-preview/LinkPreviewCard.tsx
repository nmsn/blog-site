import { memo } from 'react'
import { cn } from '@/components/lib/utils'

export interface LinkPreviewCardProps {
  title: string
  description?: string
  image?: string
  favicon?: string
  publisher?: string
  url: string
  className?: string
}

export const LinkPreviewCard = memo(function LinkPreviewCard({
  title,
  description,
  image,
  favicon,
  publisher,
  url,
  className = '',
}: LinkPreviewCardProps) {
  const displayTitle = title || url
  const displayDescription = description
  const displayPublisher = publisher || new URL(url).hostname

  return (
    <div
      className={cn('overflow-hidden rounded-xl border font-sans', className)}
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {image && (
        <div className="h-48 w-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <img src={image} alt="" loading="lazy" className="mt-0 mb-0 h-full w-full object-cover" />
        </div>
      )}

      <div className="p-4">
        <div className="mb-1 flex items-center gap-2">
          {favicon && (
            <img src={favicon} alt="" className="mt-0 mb-0 h-4 w-4 shrink-0 rounded-sm" />
          )}
          <span
            className="overflow-hidden text-xs text-ellipsis whitespace-nowrap"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {displayPublisher}
          </span>
        </div>

        <a href={url} className="text-inherit no-underline">
          <h3
            className="mt-4 mb-1 overflow-hidden text-base leading-tight font-semibold text-ellipsis whitespace-nowrap"
            style={{ color: 'var(--card-foreground)' }}
          >
            {displayTitle}
          </h3>

          {displayDescription && (
            <p
              className="mb-0 line-clamp-2 overflow-hidden text-sm leading-relaxed text-ellipsis"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {displayDescription}
            </p>
          )}
        </a>
      </div>
    </div>
  )
})
