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
      className={`flex flex-wrap items-center justify-center gap-y-4 ${
        isMobile ? 'mt-44 gap-x-6 text-sm' : 'mt-20 gap-x-10 text-base md:mt-24'
      }`}
      initial={returning ? { y: 16, opacity: 0 } : false}
      animate={{
        y: transitioning ? 24 : 0,
        opacity: transitioning ? 0 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
    >
      {shellLinks.map((link) => (
        <motion.button
          key={link.href}
          type="button"
          onClick={() => onNavigate(link.href)}
          className="group relative m-1 cursor-pointer bg-transparent font-medium text-white/88 transition-colors duration-200 hover:text-white"
          whileHover="hover"
          initial="initial"
        >
          <span className="relative">
            {link.title}
            <motion.span
              className="absolute inset-x-0 bottom-0 h-px bg-white"
              variants={{
                initial: { scaleX: 0 },
                hover: { scaleX: 1 },
              }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </span>
        </motion.button>
      ))}
    </motion.nav>
  )
}
