'use client'

import { SearchProvider, SearchConfig } from 'pliny/search'
import HomeHero from '@/components/home/HomeHero'
import siteMetadata from '@/data/siteMetadata'

import { useHomeHeroStore } from '@/components/home/homeHeroStore'
import AnimatedFooter from '@/components/home/AnimatedFooter' // ShellPreviewSkeleton is now rendered inside ContentBackground when transitioning

export default function Page() {
  const { transitioning, returning } = useHomeHeroStore()
  return (
    <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
      <HomeHero />
      <AnimatedFooter transitioning={transitioning} returning={returning} />
    </SearchProvider>
  )
}
