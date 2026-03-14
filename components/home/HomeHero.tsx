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

function ShellPreviewSkeleton() {
  return (
    <div className="flex h-full w-full justify-center px-6 py-8 text-black md:px-10 md:py-11 dark:text-white">
      <div className="w-full max-w-6xl">
        <div className="pb-8">
          <div className="text-[11px] tracking-[0.14em] text-black/55 uppercase dark:text-white/55">
            Journal
          </div>
          <div className="mt-3 h-12 w-48 bg-black/12 md:h-16 md:w-60 dark:bg-white/12" />
          <div className="mt-5 h-3 w-full max-w-2xl bg-black/8 dark:bg-white/8" />
          <div className="mt-3 h-3 w-full max-w-xl bg-black/8 dark:bg-white/8" />
        </div>

        <div className="flex flex-1 flex-col gap-8 md:flex-row md:gap-10">
          <aside className="hidden md:block md:w-[220px] md:flex-none">
            <div className="border border-black/12 bg-white px-5 py-5 dark:border-white/15 dark:bg-black">
              <div className="text-[11px] font-bold tracking-[0.12em] text-black/72 uppercase dark:text-white/72">
                All Posts
              </div>
              <div className="mt-5 space-y-3">
                {(
                  [
                    ['next-js', '6', 86],
                    ['guide', '5', 78],
                    ['tailwind', '3', 72],
                    ['images', '1', 68],
                    ['feature', '2', 74],
                  ] as [string, string, number][]
                ).map(([label, count, width]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-3 py-2 text-sm uppercase"
                    style={{ width: `${width}%` }}
                  >
                    <span className="text-black/66 dark:text-white/66">{label}</span>
                    <span className="text-black/45 dark:text-white/45">({count})</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {(
              [
                ['Apr 14, 2025', 'How the shell transition re-frames a blog index', [20, 16, 12]],
                [
                  'Apr 03, 2025',
                  'Designing a reading layout that keeps its bearings',
                  [18, 14, 10],
                ],
                [
                  'Mar 28, 2025',
                  'Small interaction details that make navigation feel anchored',
                  [16, 14, 12],
                ],
              ] as [string, string, number[]][]
            ).map(([date, title, tagWidths]) => (
              <div
                key={title}
                className="border-t border-black/10 py-7 first:border-t-0 first:pt-0 dark:border-white/12"
              >
                <div className="text-sm tracking-[0.04em] text-black/55 uppercase dark:text-white/55">
                  {date}
                </div>
                <div className="mt-4 h-8 w-full max-w-2xl bg-black/12 dark:bg-white/12" />
                <div className="mt-3 text-2xl leading-tight font-semibold text-black/85 dark:text-white/85">
                  {title}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {tagWidths.map((width) => (
                    <div
                      key={width}
                      className="h-5 bg-black/8 dark:bg-white/8"
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
                <div className="mt-5 h-3 w-full max-w-3xl bg-black/8 dark:bg-white/8" />
                <div className="mt-3 h-3 w-full max-w-2xl bg-black/8 dark:bg-white/8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

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
      >
        <div
          className={`h-full w-full transition-opacity duration-300 ${
            shellPreview ? 'opacity-100 delay-300' : 'opacity-0'
          }`}
        >
          <ShellPreviewSkeleton />
        </div>
      </div>

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
            <div className="h-[min(46vw,420px)] md:h-[min(48vw,460px)]" />

            <nav
              className={`mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] md:mt-24 ${
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
