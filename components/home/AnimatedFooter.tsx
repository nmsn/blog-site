'use client'

import Footer from '../../app/(home)/Footer'
import { motion } from 'motion/react'

interface AnimatedFooterProps {
  transitioning: boolean
  returning: boolean
}

export default function AnimatedFooter({ transitioning, returning }: AnimatedFooterProps) {
  return (
    <motion.div
      className="relative z-10"
      initial={returning ? { y: 16, opacity: 0 } : false}
      animate={{
        y: transitioning ? 32 : 0,
        opacity: transitioning ? 0 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.77, 0, 0.18, 1], delay: returning ? 0.1 : 0 }}
    >
      <Footer />
    </motion.div>
  )
}
