'use client'

import HeaderActions from '@/components/HeaderActions'
import ShellParticles from '@/components/shell/ShellParticles'
import SidebarShell from '@/components/shell/SidebarShell'
import ShellContentTransition from '@/components/shell/ShellContentTransition'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type ShellMode = 'entering' | 'idle' | 'exiting'
type ContentPhase = 'idle' | 'exiting' | 'entering'
const HOME_EXIT_DURATION = 760

export default function ShellFrame({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mode, setMode] = useState<ShellMode>('idle')
  const [contentPhase, setContentPhase] = useState<ContentPhase>('idle')
  const [exitStarted, setExitStarted] = useState(false)
  const pendingPathRef = useRef<string | null>(null)
  const homeExitTimerRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const shouldEnter = window.sessionStorage.getItem('shell-entry') === '1'
    if (!shouldEnter) {
      setMode('idle')
      return
    }

    window.sessionStorage.removeItem('shell-entry')
    setMode('entering')

    const timer = window.setTimeout(() => {
      setMode('idle')
    }, 1050)

    return () => window.clearTimeout(timer)
  }, [])

  const isEntering = mode === 'entering'
  const isExiting = mode === 'exiting'

  useEffect(() => {
    return () => {
      if (homeExitTimerRef.current) {
        window.clearTimeout(homeExitTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (contentPhase !== 'entering') return

    const frame = window.requestAnimationFrame(() => {
      setContentPhase('idle')
    })

    return () => window.cancelAnimationFrame(frame)
  }, [contentPhase])

  useEffect(() => {
    if (!pendingPathRef.current || pathname !== pendingPathRef.current) return
    pendingPathRef.current = null
    setContentPhase('entering')
  }, [pathname])

  const beginExit = () => {
    if (mode !== 'idle' || contentPhase !== 'idle') return
    setMode('exiting')
    setExitStarted(false)
    window.requestAnimationFrame(() => {
      setExitStarted(true)
    })
    homeExitTimerRef.current = window.setTimeout(() => {
      window.sessionStorage.setItem('home-entry', '1')
      router.push('/')
    }, HOME_EXIT_DURATION)
  }

  const beginContentNavigation = (href: string) => {
    if (href === pathname || mode !== 'idle' || contentPhase !== 'idle') return
    pendingPathRef.current = href
    setContentPhase('exiting')
  }

  const handleContentExitComplete = () => {
    if (contentPhase !== 'exiting' || !pendingPathRef.current) return
    router.push(pendingPathRef.current)
  }

  return (
    <div className="relative h-dvh overflow-hidden bg-white opacity-100 transition-opacity duration-150 md:flex dark:bg-black">
      {isExiting && (
        <div className="pointer-events-none absolute inset-0 z-40 hidden md:block">
          <div
            className={cn(
              'absolute inset-y-0 left-0 overflow-hidden bg-[#07131f] transition-[width] duration-[760ms] ease-[cubic-bezier(0.77,0,0.18,1)]',
              exitStarted ? 'w-full' : 'w-[320px]'
            )}
          >
            <ShellParticles />
          </div>
          <div
            className={cn(
              'absolute transition-all duration-[760ms] ease-[cubic-bezier(0.77,0,0.18,1)]',
              exitStarted
                ? 'top-1/2 left-1/2 w-[min(44vw,380px)] -translate-x-1/2 -translate-y-[56%]'
                : 'top-7 left-8 w-28 translate-x-0 translate-y-0'
            )}
          >
            <Image src="/logo.svg" alt="Logo" width={480} height={480} priority />
          </div>
        </div>
      )}
      <SidebarShell
        entering={isEntering}
        exiting={isExiting}
        onRequestHome={beginExit}
        onNavigate={beginContentNavigation}
      />
      <main
        className={cn(
          'h-[calc(100dvh-260px)] flex-1 overflow-y-auto overscroll-y-contain bg-white px-5 pt-8 pb-10 text-black transition-[transform,opacity] duration-[850ms] ease-[cubic-bezier(0.77,0,0.18,1)] [scrollbar-color:rgba(0,0,0,0.18)_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin] md:h-dvh md:px-10 md:pt-11 md:pb-12 dark:bg-black dark:text-white dark:[scrollbar-color:rgba(255,255,255,0.18)_transparent] [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/15 dark:[&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-track]:bg-transparent',
          isEntering
            ? 'translate-x-24 opacity-0'
            : isExiting
              ? 'translate-x-14 opacity-0 duration-300'
              : 'translate-x-0 opacity-100 delay-200'
        )}
      >
        <div className="sticky top-0 z-30 mb-6 bg-white/92 backdrop-blur-md md:mb-8 dark:bg-black/92">
          <HeaderActions showMobileNav />
        </div>
        <ShellContentTransition
          pathname={pathname}
          phase={contentPhase}
          onExitComplete={handleContentExitComplete}
        >
          {children}
        </ShellContentTransition>
      </main>
    </div>
  )
}
