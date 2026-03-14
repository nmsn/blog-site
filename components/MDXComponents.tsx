import TOCInlineOriginal from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

// 包装 TOCInline 组件，添加 toc 的 null 检查
function TOCInline(props: Parameters<typeof TOCInlineOriginal>[0] & { toc?: unknown[] }) {
  if (!props.toc || !Array.isArray(props.toc)) {
    return null
  }
  return <TOCInlineOriginal {...props} toc={props.toc} />
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}
