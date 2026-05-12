'use client'

interface ContentBackgroundProps {
  children: React.ReactNode
  shellPreview: boolean
}

export default function ContentBackground({ children, shellPreview }: ContentBackgroundProps) {
  return (
    <>
      {/* 斜角装饰条：调整 w-[10px] 可改变斜角角度 */}
      <div
        className={`fixed top-0 bottom-0 z-10 w-[60px] bg-white transition-[left,opacity] delay-[100ms] duration-[750ms] ease-[cubic-bezier(0.77,0,0.18,1)] dark:bg-black ${
          shellPreview ? 'left-[276px] opacity-100' : 'left-full opacity-0'
        }`}
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />
      {/* 内容面板 */}
      <div
        className={`fixed inset-y-0 right-0 z-10 overflow-y-auto bg-white transition-[left,opacity] delay-[100ms] duration-[750ms] ease-[cubic-bezier(0.77,0,0.18,1)] dark:bg-black ${
          shellPreview ? 'left-[336px] opacity-100' : 'left-full opacity-0'
        }`}
      >
        <div className="pointer-events-auto min-h-full w-full">
          {/* {transitioning ? <ShellPreviewSkeleton /> : children} */}
          {children}
        </div>
      </div>
    </>
  )
}
