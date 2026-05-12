'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useLayoutEffect, startTransition, lazy, Suspense } from 'react'
import { useHomeHeroStore } from './homeHeroStore'
import FixedLogo from './FixedLogo'
import ParticlesBackground from './ParticlesBackground'
import ShellSidebarNav from '@/components/shell/ShellSidebarNav'
import HomeNav from './HomeNav'

const ContentBackground = lazy(() => import('./ContentBackground'))

interface HomeHeroShellProps {
  children: React.ReactNode
}

export default function HomeHeroShell({ children }: HomeHeroShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { transitioning, returning, isMobile, setIsHome, setTransitioning, setIsMobile } =
    useHomeHeroStore()

  const [targetHref, setTargetHref] = useState<string | null>(null)

  // 使用 useLayoutEffect 确保在浏览器绘制前同步更新状态
  // 避免 pathname 变化和 transitioning 重置之间出现一帧不一致
  useLayoutEffect(() => {
    setIsHome(isHome)
    setTransitioning(false)
  }, [isHome, setIsHome, setTransitioning])

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)')
    setIsMobile(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [setIsMobile])

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

  const handleNavigate = () => {
    if (transitioning) return
    const logoTarget = isHome ? '/blog' : '/'
    // 设置 entry 标记
    if (logoTarget === '/') {
      window.sessionStorage.setItem('home-entry', '1')
    } else {
      window.sessionStorage.setItem('shell-entry', '1')
    }
    setTargetHref(logoTarget)
    setTransitioning(true)
  }

  const shellPreview = (isHome && transitioning) || (!isHome && !transitioning)
  const returningTransition = transitioning && !isHome
  const showHomeNav = (isHome && !transitioning) || returningTransition

  const handleSidebarNavigate = (href: string) => {
    router.push(href)
  }

  return (
    <>
      <ParticlesBackground />
      <FixedLogo onNavigate={handleNavigate} />
      <ShellSidebarNav
        visible={shellPreview && !returningTransition}
        size={isMobile ? 'mobile' : 'desktop'}
        onNavigate={handleSidebarNavigate}
      />
      <HomeNav
        transitioning={transitioning}
        returning={returning}
        show={showHomeNav}
        size={isMobile ? 'mobile' : 'desktop'}
        onNavigate={handleNavigate}
      />
      <Suspense fallback={null}>
        <ContentBackground shellPreview={shellPreview}>{children}</ContentBackground>
      </Suspense>
    </>
  )
}
