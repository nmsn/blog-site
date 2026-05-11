'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { motion } from 'motion/react'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

export type HomeNavSize = 'mobile' | 'desktop'

interface HomeNavProps {
  transitioning: boolean
  returning: boolean
  show: boolean
  size: HomeNavSize
  onNavigate: (href: string) => void
}

export default function HomeNav({
  transitioning,
  returning,
  show,
  size,
  onNavigate,
}: HomeNavProps) {
  if (!show) return null
  const isMobile = size === 'mobile'
  return (
    <motion.nav
      className={`fixed left-1/2 z-50 flex -translate-x-1/2 flex-wrap items-center justify-center gap-y-4 ${
        isMobile ? 'gap-x-6 text-sm' : 'gap-x-10 text-base'
      }`}
      style={{ top: isMobile ? '40%' : '60%' }}
      initial={returning ? { y: 24, opacity: 0 } : false}
      animate={transitioning ? { y: 24, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
    >
      {shellLinks.map((link) => (
        <motion.button
          key={link.href}
          type="button"
          onClick={() => onNavigate(link.href)}
          className="group relative m-1 cursor-pointer bg-transparent font-medium text-white transition-colors duration-200 hover:text-white/70"
        >
          <span className="relative">
            {link.title}
            <motion.span
              className="absolute inset-x-0 bottom-0 h-px bg-black dark:bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </span>
        </motion.button>
      ))}
    </motion.nav>
  )
}
