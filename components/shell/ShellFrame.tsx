'use client'

import HeaderActions from '@/components/HeaderActions'
import SidebarShell from '@/components/shell/SidebarShell'
import ShellContentTransition from '@/components/shell/ShellContentTransition'
import { useRouter } from 'next/navigation'
import { ReactNode, useLayoutEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type ShellMode = 'entering' | 'idle'

export default function ShellFrame({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [mode, setMode] = useState<ShellMode>('idle')

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
  const beginExit = () => {
    if (mode !== 'idle') return
    window.sessionStorage.setItem('home-entry', '1')
    router.push('/')
  }

  return (
    <div className="relative h-dvh overflow-hidden opacity-100 transition-opacity duration-150 md:flex">
      <SidebarShell entering={isEntering} onRequestHome={beginExit} />
      <main
        className={cn(
          'h-[calc(100dvh-260px)] flex-1 overflow-y-auto overscroll-y-contain px-5 pt-8 pb-10 backdrop-blur-[8px] transition-all duration-[850ms] ease-[cubic-bezier(0.77,0,0.18,1)] [scrollbar-color:rgba(13,26,39,0.18)_transparent] [scrollbar-gutter:stable] [scrollbar-width:thin] md:h-dvh md:px-10 md:pt-11 md:pb-12 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/15 [&::-webkit-scrollbar-track]:bg-transparent',
          isEntering ? 'translate-x-24 opacity-0' : 'translate-x-0 opacity-100 delay-200'
        )}
      >
        <div className="sticky top-0 z-30 -mx-5 -mt-8 mb-6 px-5 py-5 backdrop-blur-md md:-mx-10 md:-mt-11 md:mb-8 md:px-10 md:py-7">
          <HeaderActions showMobileNav />
        </div>
        <ShellContentTransition>{children}</ShellContentTransition>
      </main>
    </div>
  )
}
