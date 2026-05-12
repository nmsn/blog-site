'use client'

import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'

import { useHomeHeroStore } from '@/components/home/homeHeroStore'
import AnimatedFooter from '@/components/home/AnimatedFooter'

export default function Page() {
  const { transitioning, returning } = useHomeHeroStore()
  return (
    <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
      <AnimatedFooter transitioning={transitioning} returning={returning} />
    </SearchProvider>
  )
}
