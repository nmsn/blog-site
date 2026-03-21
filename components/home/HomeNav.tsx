'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { motion } from 'motion/react'

const shellLinks = headerNavLinks.filter((link) => link.href !== '/' && link.href !== '/travel')

interface HomeNavProps {
  transitioning: boolean
  returning: boolean
  onNavigate: (href: string) => void
}

export default function HomeNav({ transitioning, returning, onNavigate }: HomeNavProps) {
  return (
    <motion.nav
      className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:mt-24"
      initial={returning ? { y: 16, opacity: 0 } : false}
      animate={{
        y: transitioning ? 24 : 0,
        opacity: transitioning ? 0 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1] }}
    >
      {shellLinks.map((link) => (
        <button
          key={link.href}
          type="button"
          onClick={() => onNavigate(link.href)}
          className="m-1 cursor-pointer bg-transparent font-medium text-white/88 transition-colors duration-200 hover:text-white"
        >
          {link.title}
        </button>
      ))}
    </motion.nav>
  )
}
