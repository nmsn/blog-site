'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

type Phase = 'idle' | 'exiting' | 'entering'

export default function ShellContentTransition({
  children,
  pathname,
  phase,
  onExitComplete,
}: {
  children: ReactNode
  pathname: string
  phase: Phase
  onExitComplete?: () => void
}) {
  const animate =
    phase === 'exiting'
      ? { opacity: 0, x: -12 }
      : phase === 'entering'
        ? { opacity: 1, x: 0 }
        : { opacity: 1, x: 0 }

  const initial = phase === 'entering' ? { opacity: 0, x: 24 } : false

  return (
    <motion.div
      key={pathname}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (phase === 'exiting') {
          onExitComplete?.()
        }
      }}
      className="min-h-full"
    >
      {children}
    </motion.div>
  )
}
