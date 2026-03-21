'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { motion } from 'motion/react'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

interface ShellSidebarNavProps {
  visible: boolean
  onNavigate: (href: string) => void
}

export default function ShellSidebarNav({ visible, onNavigate }: ShellSidebarNavProps) {
  return (
    <motion.nav
      className="absolute top-[calc(1.25rem+96px)] left-5 z-20 flex flex-col gap-3 md:top-[calc(1.75rem+112px)] md:left-8"
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
      {shellLinks.map((link) => (
        <button
          key={link.href}
          type="button"
          onClick={() => onNavigate(link.href)}
          className="cursor-pointer bg-transparent text-left text-sm font-medium text-white/88 transition-colors duration-200 hover:text-white"
        >
          {link.title}
        </button>
      ))}
    </motion.nav>
  )
}
