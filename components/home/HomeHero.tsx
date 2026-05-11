'use client'

import { useHomeHeroStore } from './homeHeroStore'
import AnimatedFooter from './AnimatedFooter'

interface HomeHeroProps {
  children?: React.ReactNode
}

export default function HomeHero({ children }: HomeHeroProps) {
  const { transitioning, returning } = useHomeHeroStore()

  return (
    <div className="relative flex min-h-screen w-full text-black dark:text-white">
      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        <main className="flex flex-1 flex-col px-6 pb-12">{children}</main>

        <AnimatedFooter transitioning={transitioning} returning={returning} />
      </div>
    </div>
  )
}
