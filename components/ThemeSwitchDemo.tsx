'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type ThemeMode = 'light' | 'dark' | 'system'

const MODES: ThemeMode[] = ['light', 'dark', 'system']
const MODE_LABELS: Record<ThemeMode, string> = { light: '浅色', dark: '深色', system: '系统' }

function SunIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="5"
        initial={false}
        animate={isHovered ? { scale: [0.8, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <motion.line
          key={deg}
          x1="12"
          y1="1"
          x2="12"
          y2="3"
          transform={`rotate(${deg} 12 12)`}
          custom={i}
          initial={false}
          animate={
            isHovered
              ? { opacity: [0, 1], transition: { delay: i * 0.05, duration: 0.2 } }
              : { opacity: 1 }
          }
        />
      ))}
    </svg>
  )
}

function MoonIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={false}
      animate={isHovered ? { rotate: [0, -10, 10, -5, 5, 0] } : { rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </motion.svg>
  )
}

function MonitorIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <motion.path
        d="M9 10l2 2 4-4"
        initial={false}
        animate={
          isHovered ? { pathLength: [0, 1], opacity: [0, 1] } : { pathLength: 1, opacity: 1 }
        }
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    </svg>
  )
}

function ThemeIcon({ mode, isHovered }: { mode: ThemeMode; isHovered: boolean }) {
  switch (mode) {
    case 'light':
      return <SunIcon isHovered={isHovered} />
    case 'dark':
      return <MoonIcon isHovered={isHovered} />
    case 'system':
      return <MonitorIcon isHovered={isHovered} />
  }
}

function getEffectiveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }
  return mode
}

function SampleContent({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        'rounded-xl p-5',
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className={cn(
            'h-8 w-8 rounded-full',
            theme === 'dark' ? 'bg-primary-400' : 'bg-primary-500'
          )}
        />
        <div>
          <div className="text-sm font-semibold">示例卡片</div>
          <div className={cn('text-xs', theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>
            @demo
          </div>
        </div>
      </div>
      <p
        className={cn(
          'text-sm leading-relaxed',
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        )}
      >
        这是一段示例文本，用来展示主题切换时的视觉效果。点击上方按钮试试看，圆形动画会从按钮位置展开，把整个预览区域"刷"成新主题。
      </p>
      <div className="mt-3 flex gap-2">
        {['#前端', '#CSS', '#动画'].map((tag) => (
          <span
            key={tag}
            className={cn(
              'rounded-full px-2 py-0.5 text-xs',
              theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function DemoBody({
  mode,
  theme,
  isHovered,
  onHoverChange,
  buttonRef,
}: {
  mode: ThemeMode
  theme: 'light' | 'dark'
  isHovered: boolean
  onHoverChange: (v: boolean) => void
  buttonRef?: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        theme === 'dark' ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className={cn(
            'text-sm font-medium',
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          )}
        >
          主题预览
        </span>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs',
            theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'
          )}
        >
          {MODE_LABELS[mode]}
        </span>
      </div>

      <div className="mb-4 flex justify-center">
        <motion.div
          ref={buttonRef}
          onMouseEnter={() => onHoverChange(true)}
          onMouseLeave={() => onHoverChange(false)}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border',
            theme === 'dark'
              ? 'border-gray-700 bg-gray-800 text-yellow-300'
              : 'border-gray-300 bg-white text-gray-700'
          )}
          whileTap={{ scale: 0.9 }}
        >
          <ThemeIcon mode={mode} isHovered={isHovered} />
        </motion.div>
      </div>

      <SampleContent theme={theme} />

      <p
        className={cn(
          'mt-3 text-center text-xs',
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        )}
      >
        点击按钮切换主题，观察圆形展开动画
      </p>
    </div>
  )
}

export default function ThemeSwitchDemo() {
  const [mode, setMode] = useState<ThemeMode>('light')
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  const currentTheme = getEffectiveTheme(mode)

  const handleSwitch = useCallback(() => {
    const nextIndex = (MODES.indexOf(mode) + 1) % MODES.length
    const nextMode = MODES[nextIndex]

    const button = buttonRef.current
    if (!button) {
      setMode(nextMode)
      return
    }

    // Use View Transition API for the circular reveal animation
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      typeof document.startViewTransition === 'function'
    ) {
      const rect = button.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const vw = window.innerWidth
      const vh = window.innerHeight
      const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y))

      const transition = document.startViewTransition(() => {
        setMode(nextMode)
      })

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 400,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
    } else {
      // Fallback: instant switch for unsupported browsers
      setMode(nextMode)
    }
  }, [mode])

  return (
    <div className="not-prose my-8">
      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `}</style>
      <div onClick={handleSwitch} className="relative cursor-pointer overflow-hidden rounded-2xl">
        <DemoBody
          mode={mode}
          theme={currentTheme}
          isHovered={isHovered}
          onHoverChange={setIsHovered}
          buttonRef={buttonRef}
        />
      </div>
    </div>
  )
}
