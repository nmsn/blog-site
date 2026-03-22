import { allAuthors } from '@/lib/content/collections'
import { MDXContent } from '@content-collections/mdx/react'
import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/seo'
import { components } from '@/components/mdx/MDXComponents'
import { coreContent } from '@/lib/content'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default')
  if (!author) {
    return null
  }
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXContent code={author.body} components={components} />
      </AuthorLayout>
    </>
  )
}
