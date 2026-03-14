import siteMetadata from '@/data/siteMetadata'
import MobileNav from '@/components/MobileNav'
import ThemeSwitch from '@/components/ThemeSwitch'
import SearchButton from '@/components/SearchButton'

const Header = () => {
  let headerClass =
    'flex items-center w-full justify-end px-6 py-6 md:px-10 md:py-10 gap-x-4 bg-transparent'
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
