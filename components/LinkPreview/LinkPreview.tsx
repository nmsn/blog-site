'use client'

import Microlink from '@microlink/react'

interface CustomLinkPreviewProps {
  url: string
}

export default function LinkPreview({ url }: CustomLinkPreviewProps) {
  return (
    <div className="my-4">
      <Microlink
        url={url}
        style={{ borderRadius: '8px' }}
        loadingComponent={
          <div className="flex items-center justify-center rounded-lg border border-gray-200 p-8 dark:border-gray-700">
            <div className="border-primary-500 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            <span className="ml-2 text-sm text-gray-500">Loading preview...</span>
          </div>
        }
        errorComponent={
          <div className="flex items-center justify-center rounded-lg border border-gray-200 p-4 text-sm text-gray-500 dark:border-gray-700">
            Unable to load preview
          </div>
        }
      />
    </div>
  )
}
