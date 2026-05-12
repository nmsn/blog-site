'use client'

import Particles from '@/components/ui/Particles'

export default function ParticlesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 w-full overflow-hidden">
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
