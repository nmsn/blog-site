'use client'

import { create } from 'zustand'

interface HomeHeroState {
  transitioning: boolean
  returning: boolean
  isHome: boolean
  isMobile: boolean
}

interface HomeHeroActions {
  setTransitioning: (value: boolean) => void
  setReturning: (value: boolean) => void
  setIsHome: (value: boolean) => void
  setIsMobile: (value: boolean) => void
  // 派生状态
  getShellPreview: () => boolean
  getShowHomeNav: () => boolean
  getReturningTransition: () => boolean
}

export const useHomeHeroStore = create<HomeHeroState & HomeHeroActions>((set, get) => ({
  transitioning: false,
  returning: false,
  isHome: true,
  isMobile: false,

  setTransitioning: (value) => set({ transitioning: value }),
  setReturning: (value) => set({ returning: value }),
  setIsHome: (value) => set({ isHome: value }),
  setIsMobile: (value) => set({ isMobile: value }),

  getShellPreview: () => {
    const { isHome, transitioning } = get()
    return (isHome && transitioning) || (!isHome && !transitioning)
  },
  getShowHomeNav: () => {
    const { isHome, transitioning } = get()
    const returningTransition = transitioning && !isHome
    return isHome || returningTransition
  },
  getReturningTransition: () => {
    const { isHome, transitioning } = get()
    return transitioning && !isHome
  },
}))
