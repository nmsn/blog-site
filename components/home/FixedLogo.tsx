'use client'

import { useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useHomeHeroStore } from './homeHeroStore'

interface FixedLogoProps {
  onNavigate: () => void
}

export default function FixedLogo({ onNavigate }: FixedLogoProps) {
  const { transitioning, returning, isHome, isMobile } = useHomeHeroStore()
  const [isReady, setIsReady] = useState(false)

  // SSR 时 store 的 isHome 默认为 true，在非首页路由需要等 useLayoutEffect 修正后再渲染
  useLayoutEffect(() => {
    setIsReady(true)
  }, [])

  // 首页静态或正在返回首页：目标是居中
  // Shell 静态或正在进入 Shell：目标是左上角
  const toCenter = (isHome && !transitioning) || (transitioning && !isHome)

  if (!isReady) return null

  return (
    <motion.div
      className="fixed z-20 cursor-pointer"
      initial={returning ? { x: -20, opacity: 0 } : false}
      animate={{
        top: toCenter ? '50%' : isMobile ? '1.25rem' : '1.75rem',
        left: toCenter ? '50%' : isMobile ? '1.25rem' : '2rem',
        x: toCenter ? '-50%' : 0,
        y: toCenter ? (isMobile ? '-36%' : '-56%') : 0,
        width: toCenter ? '20rem' : '7rem',
        opacity: 1,
      }}
      transition={{
        duration: 0.95,
        ease: [0.77, 0, 0.18, 1],
      }}
    >
      <button
        type="button"
        onClick={onNavigate}
        className="block w-full cursor-pointer bg-transparent p-0 text-left leading-none"
        aria-label="Navigate"
      >
        <Image src="/logo.svg" alt="Logo" width={480} height={480} priority />
      </button>
    </motion.div>
  )
}
