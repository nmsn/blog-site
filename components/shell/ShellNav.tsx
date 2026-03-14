'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

export default function ShellNav({ onNavigate }: { onNavigate?: (href: string) => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col items-start gap-3 md:gap-4" aria-label="Sidebar Navigation">
      {shellLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

        return (
          <button
            key={link.href}
            type="button"
            onClick={() => onNavigate?.(link.href)}
            className={cn(
              'relative cursor-pointer bg-transparent text-left text-sm font-medium tracking-[0.02em] text-white/62 transition duration-200 hover:text-white',
              isActive && 'text-white'
            )}
          >
            {link.title}
            <span
              className={cn(
                'absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-300',
                isActive ? 'scale-x-100' : 'scale-x-0'
              )}
            />
          </button>
        )
      })}
    </nav>
  )
}
