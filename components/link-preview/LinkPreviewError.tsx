import { memo } from 'react'
import { cn } from '@/lib/utils'

export interface LinkPreviewErrorInfo {
  code: string
  message: string
}

export interface LinkPreviewErrorProps {
  error: LinkPreviewErrorInfo
  fallback?: React.ReactNode
  className?: string
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export const LinkPreviewError = memo(function LinkPreviewError({
  error,
  fallback,
  className = '',
}: LinkPreviewErrorProps) {
  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <div
      className={cn('overflow-hidden rounded-xl border p-4 font-sans', className)}
      role="alert"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-start gap-2" style={{ color: 'var(--muted-foreground)' }}>
        <WarningIcon />

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
            {error.message}
          </span>

          {error.code && <span className="font-mono text-[11px] opacity-70">{error.code}</span>}
        </div>
      </div>
    </div>
  )
})
