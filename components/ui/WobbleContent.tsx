'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export const WobbleContent = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const maxOffset = 10
    const x = Math.max(
      -maxOffset,
      Math.min(maxOffset, (clientX - (rect.left + rect.width / 2)) / 30)
    )
    const y = Math.max(
      -maxOffset,
      Math.min(maxOffset, (clientY - (rect.top + rect.height / 2)) / 30)
    )
    setMousePosition({ x, y })

    // 创建并分发自定义事件给 Particles 组件
    const particlesEvent = new CustomEvent('particlesMouseMove', {
      detail: { clientX, clientY },
    })
    document.dispatchEvent(particlesEvent)
  }
  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      className={cn('relative mx-auto w-full overflow-hidden rounded-2xl', containerClassName)}
    >
      <motion.div
        animate={{
          x: isHovering ? mousePosition.x : 0,
          y: isHovering ? mousePosition.y : 0,
        }}
        transition={{ type: 'spring', stiffness: 130, damping: 24, mass: 0.9 }}
        className={cn('will-change-transform', className)}
      >
        {children}
      </motion.div>
    </section>
  )
}
