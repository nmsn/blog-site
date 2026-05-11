'use client'

import { useHomeHeroStore } from '@/components/home/homeHeroStore'
import ShellPreviewSkeleton from './ShellPreviewSkeleton'

export default function ShellPreviewSkeletonWrapper() {
  const { isHome, transitioning } = useHomeHeroStore()
  const shellPreview = (isHome && transitioning) || (!isHome && !transitioning)

  if (!shellPreview) return null
  return <ShellPreviewSkeleton />
}
