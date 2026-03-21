'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

interface ShellSidebarNavProps {
  visible: boolean
  onNavigate: (href: string) => void
}

export default function ShellSidebarNav({ visible, onNavigate }: ShellSidebarNavProps) {
  const pathname = usePathname()

  return (
    <motion.nav
      className="absolute top-[calc(1.25rem+120px)] left-5 z-20 flex flex-col gap-4 md:top-[calc(1.75rem+140px)] md:left-8"
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
            className={`relative cursor-pointer bg-transparent text-left text-sm font-medium transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-white/88 hover:text-white'
            }`}
          >
            {link.title}
            {isActive && (
              <motion.span
                className="absolute -bottom-0.5 left-0 h-px w-full bg-white/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />
            )}
          </button>
        )
      })}
    </motion.nav>
  )
}
