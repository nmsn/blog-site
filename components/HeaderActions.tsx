'use client'

import MobileNav from '@/components/MobileNav'
import SearchButton from '@/components/SearchButton'
import ThemeSwitch from '@/components/ThemeSwitch'
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
