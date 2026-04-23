import { memo } from 'react'
import { cn } from '@/components/lib/utils'

export interface LinkPreviewSkeletonProps {
  className?: string
}

export const LinkPreviewSkeleton = memo(function LinkPreviewSkeleton({
  className = '',
}: LinkPreviewSkeletonProps) {
  return (
    <div
      className={cn('animate-pulse overflow-hidden rounded-xl border font-sans', className)}
      role="status"
      aria-label="Loading link preview"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="h-48 w-full" style={{ backgroundColor: 'var(--border)' }} />

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <div
            className="h-4 w-4 shrink-0 rounded-sm"
            style={{ backgroundColor: 'var(--border)' }}
          />
          <div className="h-3 w-20 rounded" style={{ backgroundColor: 'var(--border)' }} />
        </div>

        <div className="mb-2 h-4 w-3/4 rounded" style={{ backgroundColor: 'var(--border)' }} />

        <div className="mb-1.5 h-3 w-full rounded" style={{ backgroundColor: 'var(--border)' }} />
        <div className="h-3 w-3/5 rounded" style={{ backgroundColor: 'var(--border)' }} />
      </div>
    </div>
  )
})
