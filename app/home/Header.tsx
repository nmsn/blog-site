import siteMetadata from '@/data/siteMetadata'
import MobileNav from '@/components/MobileNav'
import ThemeSwitch from '@/components/ThemeSwitch'
import SearchButton from '@/components/SearchButton'

const Header = () => {
  let headerClass =
    'flex items-center w-full bg-white dark:bg-gray-950 justify-end px-10 py-10 gap-x-4'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <SearchButton />
      <ThemeSwitch />
      <MobileNav />
    </header>
  )
}

export default Header
