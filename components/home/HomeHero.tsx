'use client'

import Particles from '@/components/ui/Particles'
import { WobbleContent } from '@/components/ui/WobbleContent'
import headerNavLinks from '@/data/headerNavLinks'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useMemo, useState, startTransition } from 'react'
import Header from '../../app/(home)/Header'
import { motion } from 'motion/react'
import ShellPreviewSkeleton from '@/components/shell/ShellPreviewSkeleton'
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
  const [transitioning, setTransitioning] = useState(false)
  const [returning] = useState(() => {
    if (typeof window === 'undefined') return false
    const isReturning = window.sessionStorage.getItem('home-entry') === '1'
    if (isReturning) {
      window.sessionStorage.removeItem('home-entry')
    }
    return isReturning
  })
  const [targetHref, setTargetHref] = useState<string | null>(null)

  const isHome = pathname === '/'
  const logoTarget = useMemo(() => (isHome ? '/blog' : '/'), [isHome])

  useEffect(() => {
    shellLinks.forEach((link) => {
      router.prefetch(link.href)
    })
    router.prefetch(logoTarget)
  }, [router, logoTarget])

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

  const enteringTransition = transitioning && isHome
  const returningTransition = transitioning && !isHome
  const shellPreview = (isHome && transitioning) || (!isHome && !transitioning)
  const showContent = (isHome && transitioning) || (!isHome && !transitioning)

  return (
    <div className="relative flex min-h-screen w-full bg-white text-black dark:bg-black dark:text-white">
      {/* 粒子裁剪容器：尺寸变化 + overflow-hidden + clip-path，控制粒子可见区域 */}
      <div
        className={`pointer-events-none fixed inset-0 z-10 overflow-hidden transition-[width,clip-path,box-shadow] duration-[1050ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          shellPreview
            ? 'w-[320px] shadow-[24px_0_80px_rgba(7,19,31,0.18)] [clip-path:polygon(0_0,100%_0,calc(100%-56px)_100%,0_100%)]'
            : 'w-full [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'
        }`}
      >
        {/* 粒子容器：固定全屏尺寸，不随父容器变化 */}
        <div className="fixed inset-0 z-20 h-screen w-screen">
          <Particles
            particleColors={['#27A6DE', '#7AD7FF', '#D8F4FF']}
            particleCount={500}
            moveParticlesOnHover={true}
            particleHoverFactor={0.7}
            alphaParticles={true}
            className="!absolute !h-full !w-full"
          />
        </div>
        {/* 背景色层：覆盖在粒子上方，形成深色背景效果 */}
        <div className="pointer-events-none absolute inset-0 h-screen w-screen bg-[#07131f]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        <Header />

        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
          <div
            className={`absolute top-1/2 left-1/2 z-20 w-[min(44vw,380px)] -translate-x-1/2 -translate-y-[56%] transition-all duration-[950ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
              transitioning && isHome
                ? 'top-5 left-5 w-24 translate-x-0 translate-y-0 md:top-7 md:left-8 md:w-28'
                : transitioning && !isHome
                  ? 'top-1/2 left-1/2 w-[min(44vw,380px)] -translate-x-1/2 -translate-y-[56%]'
                  : !isHome
                    ? 'top-5 left-5 w-24 translate-x-0 translate-y-0 md:top-7 md:left-8 md:w-28'
                    : ''
            }`}
          >
            <WobbleContent containerClassName="max-w-[480px]">
              <button
                type="button"
                onClick={() => beginTransition(logoTarget)}
                className="block w-full cursor-pointer bg-transparent p-0 text-left leading-none"
                aria-label="Enter blog shell"
              >
                <Image src="/logo.svg" alt="Logo" width={480} height={480} priority />
              </button>
            </WobbleContent>
          </div>

          <ShellSidebarNav
            visible={shellPreview && !returningTransition}
            onNavigate={handleSidebarNavigate}
          />

          <div className="relative flex w-full max-w-5xl flex-1 flex-col items-center justify-center">
            <div className="h-[min(46vw,420px)] md:h-[min(48vw,460px)]" />

            <HomeNav
              transitioning={transitioning}
              returning={returning}
              onNavigate={beginTransition}
            />
          </div>
        </main>

        <AnimatedFooter transitioning={transitioning} returning={returning} />
      </div>

      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-20 hidden overflow-hidden bg-white opacity-0 transition-[left,transform,opacity] duration-[850ms] ease-[cubic-bezier(0.77,0,0.18,1)] md:block dark:bg-black ${
          showContent
            ? 'left-[336px] translate-x-0 opacity-100 delay-200'
            : 'left-full translate-x-24'
        }`}
      >
        <div
          className={`pointer-events-auto h-full w-full transition-opacity duration-300 ${
            showContent ? 'opacity-100 delay-300' : 'opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
