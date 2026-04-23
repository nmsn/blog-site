'use client'

import { useState, useEffect, memo } from 'react'
import { LinkPreviewCard, LinkPreviewSkeleton } from '@/components/link-preview'
import { LinkPreviewError } from '@/components/link-preview'
import type { LinkPreviewErrorInfo } from '@/components/link-preview'
import { fetchMetadata } from '@/lib/link-preview'

interface FetchState {
  data: Awaited<ReturnType<typeof fetchMetadata>> | null
  loading: boolean
  error: LinkPreviewErrorInfo | null
}

interface LinkPreviewProps {
  url: string
  className?: string
}

export const LinkPreview = memo(function LinkPreview({ url, className }: LinkPreviewProps) {
  const [state, setState] = useState<FetchState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetchMetadata(url)
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null })
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: { code: 'FETCH_ERROR', message: err instanceof Error ? err.message : 'Failed' },
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return (
    <div className={className}>
      {state.loading && <LinkPreviewSkeleton className="mt-2 w-140" />}
      {state.error && !state.loading && (
        <LinkPreviewError error={state.error} className="mt-2 w-140" />
      )}
      {state.data && !state.loading && (
        <LinkPreviewCard
          url={state.data.url}
          title={state.data.title}
          description={state.data.description}
          image={state.data.image}
          favicon={state.data.favicon}
          publisher={state.data.publisher}
          className="mt-2 w-140"
        />
      )}
    </div>
  )
})
