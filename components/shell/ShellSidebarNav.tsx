'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

export type SidebarSize = 'mobile' | 'desktop'

interface ShellSidebarNavProps {
  visible: boolean
  size: SidebarSize
  onNavigate: (href: string) => void
}

export default function ShellSidebarNav({ visible, size, onNavigate }: ShellSidebarNavProps) {
  const pathname = usePathname()
  const isMobile = size === 'mobile'

  return (
    <motion.nav
      className={`absolute z-20 flex flex-col gap-4 ${
        isMobile ? 'top-[calc(1.25rem+120px)] left-5' : 'top-[calc(1.75rem+140px)] left-8'
      }`}
      initial={false}
      animate={{
        x: visible ? 0 : -20,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.77, 0, 0.18, 1],
        delay: visible ? 0.3 : 0,
      }}
    >
      {shellLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
        return (
          <button
            key={link.href}
            type="button"
            onClick={() => onNavigate(link.href)}
            className={`relative cursor-pointer bg-transparent text-left transition-colors duration-200 ${
              isMobile ? 'text-xs' : 'text-sm'
            } ${isActive ? 'text-white' : 'text-white/88 hover:text-white'}`}
          >
            <span className="relative">
              {link.title}
              {isActive && (
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </span>
          </button>
        )
      })}
    </motion.nav>
  )
}
