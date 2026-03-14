'use client'

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
    <div className="relative min-h-screen opacity-100 transition-opacity duration-150 md:flex">
      <SidebarShell entering={isEntering} onRequestHome={beginExit} />
      <main
        className={cn(
          'min-h-[calc(100vh-260px)] flex-1 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.16))] px-5 pt-8 pb-10 backdrop-blur-[8px] transition-all duration-[850ms] ease-[cubic-bezier(0.77,0,0.18,1)] md:min-h-screen md:px-10 md:pt-11 md:pb-12',
          isEntering ? 'translate-x-24 opacity-0' : 'translate-x-0 opacity-100 delay-200'
        )}
      >
        <ShellContentTransition>{children}</ShellContentTransition>
      </main>
    </div>
  )
}
