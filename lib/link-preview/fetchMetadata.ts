export interface LinkPreviewData {
  url: string
  title: string
  description: string
  image: string
  favicon: string
  publisher: string
}

const metadataCache = new Map<string, LinkPreviewData>()

function generateCacheKey(url: string): string {
  return `preview:${url}`
}

export async function fetchMetadata(url: string): Promise<LinkPreviewData> {
  const cacheKey = generateCacheKey(url)

  const cached = metadataCache.get(cacheKey)
  if (cached) {
    return cached
  }

  const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to fetch preview')
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error(result.error?.message || 'Unknown error')
  }

  metadataCache.set(cacheKey, result.data)

  return result.data
}
