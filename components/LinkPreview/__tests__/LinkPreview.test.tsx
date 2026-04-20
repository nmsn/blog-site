import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LinkPreview from '../LinkPreview'

// Mock the Microlink component
vi.mock('@microlink/react', () => ({
  default: ({
    url,
    loadingComponent,
    errorComponent,
  }: {
    url: string
    loadingComponent?: React.ReactNode
    errorComponent?: React.ReactNode
  }) => {
    if (url.includes('error')) {
      return <div data-testid="link-preview-error">{errorComponent}</div>
    }
    return (
      <div data-testid="link-preview-success" data-url={url}>
        <h4>Mock Title</h4>
        <p>Mock description</p>
      </div>
    )
  },
}))

describe('LinkPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with url prop', () => {
    render(<LinkPreview url="https://x.com/brendonovich/status/2045725889422610602" />)
    expect(screen.getByTestId('link-preview-success')).toBeInTheDocument()
  })

  it('passes url to Microlink', () => {
    const url = 'https://x.com/brendonovich/status/2045725889422610602'
    render(<LinkPreview url={url} />)
    expect(screen.getByTestId('link-preview-success')).toHaveAttribute('data-url', url)
  })

  it('shows error component for error URL', () => {
    render(<LinkPreview url="https://error.com" />)
    expect(screen.getByTestId('link-preview-error')).toBeInTheDocument()
  })
})
