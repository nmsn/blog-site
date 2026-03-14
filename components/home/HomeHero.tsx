'use client'

import Footer from '../../app/(home)/Footer'
import Particles from '@/components/ui/Particles'
import { WobbleContent } from '@/components/ui/WobbleContent'
import headerNavLinks from '@/data/headerNavLinks'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useState, startTransition } from 'react'
import Header from '../../app/(home)/Header'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

export default function HomeHero() {
  const router = useRouter()
  const [transitioning, setTransitioning] = useState(false)
  const [returning, setReturning] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem('home-entry') === '1'
  })
  const [targetHref, setTargetHref] = useState<string | null>(null)

  const logoTarget = useMemo(() => '/blog', [])

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

  useLayoutEffect(() => {
    if (!returning) return

    window.sessionStorage.removeItem('home-entry')
    let settleTimer = 0

    const frame = window.requestAnimationFrame(() => {
      settleTimer = window.setTimeout(() => {
        setReturning(false)
      }, 40)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      if (settleTimer) {
        window.clearTimeout(settleTimer)
      }
    }
  }, [returning])

  const beginTransition = (href: string) => {
    if (transitioning) return
    window.sessionStorage.setItem('shell-entry', '1')
    setTargetHref(href)
    setTransitioning(true)
  }

  const shellPreview = transitioning || returning

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      <div
        className={`pointer-events-none absolute inset-0 z-0 bg-[#07131f] transition-[width,clip-path,box-shadow] duration-[1050ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          shellPreview
            ? 'w-[320px] shadow-[24px_0_80px_rgba(7,19,31,0.18)] [clip-path:polygon(0_0,100%_0,calc(100%-56px)_100%,0_100%)]'
            : 'w-full [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'
        }`}
      >
        <Particles
          particleColors={['#27A6DE', '#7AD7FF', '#D8F4FF']}
          particleCount={500}
          moveParticlesOnHover={true}
          particleHoverFactor={0.7}
          alphaParticles={true}
          className="!absolute !h-full !w-full"
        />
        <div className="absolute inset-0" />
      </div>

      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-0 hidden overflow-hidden bg-white opacity-0 transition-all duration-[850ms] ease-[cubic-bezier(0.77,0,0.18,1)] md:block dark:bg-black ${
          shellPreview
            ? 'left-[336px] translate-x-0 opacity-100 delay-200'
            : 'left-full translate-x-24'
        }`}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
          <div
            className={`absolute top-1/2 left-1/2 z-20 w-[min(44vw,380px)] -translate-x-1/2 -translate-y-[56%] transition-all duration-[950ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
              transitioning || returning
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

          <div className="relative flex w-full max-w-5xl flex-1 flex-col items-center justify-center">
            <div className="h-[min(44vw,380px)]" />

            <nav
              className={`mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
                transitioning || returning ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              {shellLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => beginTransition(link.href)}
                  className="m-1 cursor-pointer bg-transparent font-medium text-white/88 transition-colors duration-200 hover:text-white"
                >
                  {link.title}
                </button>
              ))}
            </nav>
          </div>
        </main>

        <div
          className={`relative z-10 transition-opacity duration-300 ${transitioning || returning ? 'opacity-0' : 'opacity-100'}`}
        >
          <Footer />
        </div>
      </div>
    </div>
  )
}
