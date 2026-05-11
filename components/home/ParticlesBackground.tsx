'use client'

import Particles from '@/components/ui/Particles'

interface ParticlesBackgroundProps {
  shellPreview: boolean
}

export default function ParticlesBackground({ shellPreview }: ParticlesBackgroundProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-10 overflow-hidden transition-[width,clip-path,box-shadow] duration-[1050ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
        shellPreview
          ? 'w-[320px] shadow-[24px_0_80px_rgba(7,19,31,0.18)] [clip-path:polygon(0_0,100%_0,calc(100%-56px)_100%,0_100%)]'
          : 'w-full [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'
      }`}
    >
      {/* 粒子容器：固定全屏尺寸，不随父容器变化 */}
      <div className="fixed inset-0 z-20 h-screen w-screen">
        <Particles
          particleColors={['#27A6DE', '#7AD7FF', '#D8F4FF']}
          particleCount={500}
          moveParticlesOnHover={true}
          particleHoverFactor={0.7}
          alphaParticles={true}
          className="!absolute !h-full !w-full"
        />
      </div>
      {/* 背景色层：覆盖在粒子上方，形成深色背景效果 */}
      <div className="pointer-events-none absolute inset-0 h-screen w-screen bg-[#07131f]" />
    </div>
  )
}
