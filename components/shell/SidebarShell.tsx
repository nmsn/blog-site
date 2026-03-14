'use client'

import Image from 'next/image'
import ShellNav from '@/components/shell/ShellNav'
import ShellParticles from '@/components/shell/ShellParticles'
import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/lib/utils'

export default function SidebarShell({
  entering = false,
  onRequestHome,
}: {
  entering?: boolean
  onRequestHome?: () => void
}) {
  return (
    <aside
      className={cn(
        'relative h-[260px] overflow-hidden bg-white text-white transition-[width] duration-[1050ms] ease-[cubic-bezier(0.77,0,0.18,1)] md:h-dvh md:flex-none dark:bg-black',
        entering ? 'md:w-full md:bg-[#07131f]' : 'md:w-[320px]'
      )}
    >
      <div
        className="absolute inset-0 hidden md:block"
        style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 56px) 100%, 0 100%)' }}
      >
        <div className="absolute inset-0 bg-[#07131f]" />
        <ShellParticles />
      </div>

      <div
        className="absolute inset-0 md:hidden"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 42px), 0 100%)' }}
      >
        <div className="absolute inset-0 bg-[#07131f]" />
        <ShellParticles />
      </div>

      <div
        className={cn(
          'relative z-10 flex h-full flex-col px-5 pt-5 pb-8 transition-opacity duration-500 md:px-8 md:pt-7 md:pb-10',
          entering ? 'opacity-85' : 'opacity-100'
        )}
      >
        <button
          type="button"
          onClick={onRequestHome}
          aria-label={siteMetadata.headerTitle}
          className="block w-fit bg-transparent p-0 text-left"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={112}
            height={112}
            priority
            className="h-auto w-24 transition-all duration-[950ms] ease-[cubic-bezier(0.77,0,0.18,1)] md:w-28"
          />
        </button>

        <div className="mt-8 md:mt-10">
          <ShellNav />
        </div>
      </div>
    </aside>
  )
}
