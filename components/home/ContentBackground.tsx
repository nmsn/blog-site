'use client'

import { useHomeHeroStore } from './homeHeroStore'
import ShellPreviewSkeleton from '@/components/shell/ShellPreviewSkeleton'

interface ContentBackgroundProps {
  children: React.ReactNode
  shellPreview: boolean
}

export default function ContentBackground({ children, shellPreview }: ContentBackgroundProps) {
  const { transitioning } = useHomeHeroStore()

  return (
    <div
      className={`fixed inset-y-0 right-0 z-10 overflow-y-auto bg-white transition-[left,transform,opacity] duration-[850ms] ease-[cubic-bezier(0.77,0,0.18,1)] dark:bg-black ${
        shellPreview
          ? 'left-[336px] translate-x-0 opacity-100'
          : 'left-full translate-x-24 opacity-0'
      }`}
    >
      <div className="pointer-events-auto min-h-full w-full">
        {transitioning ? <ShellPreviewSkeleton /> : children}
      </div>
    </div>
  )
}
