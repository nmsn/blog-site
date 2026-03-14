'use client'

import Particles from '@/components/ui/Particles'

export default function ShellParticles() {
  return (
    <div className="absolute inset-0">
      <Particles
        particleColors={['#27A6DE', '#7AD7FF', '#D8F4FF']}
        particleCount={220}
        particleSpread={8}
        speed={0.08}
        moveParticlesOnHover={true}
        particleHoverFactor={0.45}
        alphaParticles={true}
        particleBaseSize={90}
        sizeRandomness={0.9}
        cameraDistance={18}
        className="!absolute !h-full !w-full"
      />
      <div className="pointer-events-none absolute inset-0" />
    </div>
  )
}
