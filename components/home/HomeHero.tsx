'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, startTransition } from 'react'
import { useHomeHeroStore } from './homeHeroStore'
import ShellSidebarNav from '@/components/shell/ShellSidebarNav'
import AnimatedFooter from './AnimatedFooter'
import HomeNav from './HomeNav'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

interface HomeHeroProps {
  children?: React.ReactNode
}

export default function HomeHero({ children }: HomeHeroProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { transitioning, returning, isHome, isMobile, setTransitioning } = useHomeHeroStore()

  const [targetHref, setTargetHref] = useState<string | null>(null)

  useEffect(() => {
    shellLinks.forEach((link) => {
      router.prefetch(link.href)
    })
    router.prefetch(isHome ? '/blog' : '/')
  }, [router, isHome])

  // 动画计时器：880ms 后执行路由跳转
  useEffect(() => {
    if (!transitioning || !targetHref) return

    const timer = window.setTimeout(() => {
      startTransition(() => {
        router.push(targetHref)
      })
    }, 880)

    return () => window.clearTimeout(timer)
  }, [router, targetHref, transitioning])

  const beginTransition = (href: string) => {
    if (transitioning) return
    // 根据目标路由设置对应的 entry 标记
    if (href === '/') {
      window.sessionStorage.setItem('home-entry', '1')
    } else {
      window.sessionStorage.setItem('shell-entry', '1')
    }
    setTargetHref(href)
    setTransitioning(true)
  }

  const handleSidebarNavigate = (href: string) => {
    router.push(href)
  }

  const shellPreview = (isHome && transitioning) || (!isHome && !transitioning)
  const returningTransition = transitioning && !isHome
  const showHomeNav = isHome || returningTransition

  return (
    <div className="relative flex min-h-screen w-full text-black dark:text-white">
      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
          <ShellSidebarNav
            visible={shellPreview && !returningTransition}
            size={isMobile ? 'mobile' : 'desktop'}
            onNavigate={handleSidebarNavigate}
          />

          <div className="relative flex w-full max-w-5xl flex-1 flex-col items-center justify-center">
            <div className="h-[min(46vw,420px)] md:h-[min(48vw,460px)]" />

            <HomeNav
              transitioning={transitioning}
              returning={returning}
              show={showHomeNav}
              size={isMobile ? 'mobile' : 'desktop'}
              onNavigate={beginTransition}
            />
          </div>
        </main>

        <AnimatedFooter transitioning={transitioning} returning={returning} />
      </div>
    </div>
  )
}
