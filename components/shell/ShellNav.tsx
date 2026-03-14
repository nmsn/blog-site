'use client'

import Link from '@/components/Link'
import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

export default function ShellNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col items-start gap-3 md:gap-4" aria-label="Sidebar Navigation">
      {shellLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'relative text-sm font-medium tracking-[0.02em] text-white/62 transition duration-200 hover:text-white',
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
          </Link>
        )
      })}
    </nav>
  )
}
