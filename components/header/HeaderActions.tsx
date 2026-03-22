'use client'

import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'
import { cn } from '@/lib/utils'

export default function HeaderActions({
  className,
  showMobileNav = false,
}: {
  className?: string
  showMobileNav?: boolean
}) {
  return (
    <div className={cn('flex items-center justify-end gap-x-4', className)}>
      <SearchButton />
      <ThemeSwitch />
      {showMobileNav && <MobileNav />}
    </div>
  )
}
