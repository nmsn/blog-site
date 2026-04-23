import { NextResponse } from 'next/server'
import NodeCache from 'node-cache'
import { validateUrl } from '@/lib/link-preview/validate'

const previewCache = new NodeCache({ stdTTL: 3600 })

interface LinkPreviewData {
  url: string
  title: string
  description: string
  image: string
  favicon: string
  publisher: string
}

const DEFAULT_TIMEOUT = 10000
const DEFAULT_USER_AGENT = 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0; +https://example.com/bot)'

function generateCacheKey(url: string): string {
  return `preview:${url}`
}

interface ParsedMetadata {
  title: string
  description: string
  image: string
  favicon: string
  publisher: string
}

const METADATA_SELECTORS = {
  title: ['meta[property="og:title"]', 'meta[name="twitter:title"]', 'title'],
  description: [
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
    'meta[name="description"]',
  ],
  image: [
    'meta[property="og:image"]',
    'meta[name="twitter:image"]',
    'meta[name="twitter:image:src"]',
  ],
  favicon: ['link[rel="icon"]', 'link[rel="shortcut icon"]', 'link[rel="apple-touch-icon"]'],
  publisher: ['meta[property="og:site_name"]', 'meta[name="application-name"]'],
}

function extractFirst($: any, selectors: string[]): string {
  for (const selector of selectors) {
    const element = $(selector).first()
    if (element.length) {
      const content = element.attr('content')
      if (content) return content.trim()
      const text = element.text()
      if (text) return text.trim()
    }
  }
  return ''
}

function resolveUrl(baseUrl: string, relativeUrl: string): string {
  if (!relativeUrl) return ''
  try {
    return new URL(relativeUrl, baseUrl).href
  } catch {
    return relativeUrl
  }
}

function parseHtml(html: string, baseUrl: string): ParsedMetadata {
  // Dynamic import cheerio
  const cheerio = require('cheerio')
  const $ = cheerio.load(html)

  const title = extractFirst($, METADATA_SELECTORS.title) || baseUrl
  const description = extractFirst($, METADATA_SELECTORS.description) || ''
  const image = resolveUrl(baseUrl, extractFirst($, METADATA_SELECTORS.image))
  const favicon = resolveUrl(baseUrl, extractFirst($, METADATA_SELECTORS.favicon))
  const publisher = extractFirst($, METADATA_SELECTORS.publisher) || ''

  return { title, description, image, favicon, publisher }
}

function getFallbackFavicon(url: string): string {
  try {
    const { hostname } = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
  } catch {
    return ''
  }
}

async function fetchMetadata(url: string): Promise<LinkPreviewData> {
  const cacheKey = generateCacheKey(url)

  const cached = previewCache.get<LinkPreviewData>(cacheKey)
  if (cached) {
    return cached
  }

  const timeout = DEFAULT_TIMEOUT
  const headers = {
    'User-Agent': DEFAULT_USER_AGENT,
    Accept: 'text/html,application/xhtml+xml',
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    const baseUrl = response.url || url

    const parsed = parseHtml(html, baseUrl)

    const result: LinkPreviewData = {
      url: baseUrl,
      title: parsed.title || baseUrl,
      description: parsed.description,
      image: parsed.image,
      favicon: parsed.favicon || getFallbackFavicon(baseUrl),
      publisher: parsed.publisher || new URL(baseUrl).hostname,
    }

    previewCache.set(cacheKey, result)

    return result
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout', { cause: error })
      }
      throw error
    }

    throw new Error('Unknown error occurred', { cause: error })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  const validation = validateUrl(url!)
  if (!validation.valid) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: validation.error?.code || 'INVALID_URL',
          message: validation.error?.message || 'Invalid URL',
        },
      },
      { status: 400 }
    )
  }

  try {
    const data = await fetchMetadata(url!)

    const cacheKey = generateCacheKey(url!)
    const isCacheHit = previewCache.has(cacheKey)

    return NextResponse.json({
      success: true,
      data,
      meta: {
        cached: isCacheHit,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message,
        },
      },
      { status: 500 }
    )
  }
}
