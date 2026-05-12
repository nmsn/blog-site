import { SearchProvider, SearchConfig } from 'pliny/search'
import HomeHero from '@/components/home/HomeHero'
import siteMetadata from '@/data/siteMetadata'
import HeaderActions from '@/components/header/HeaderActions'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
      <HomeHero>
        <div>
          <div className="sticky top-0 z-30 bg-white/92 pt-8 pb-4 not-only:backdrop-blur-md dark:bg-black/92">
            <HeaderActions showMobileNav />
          </div>
          {children}
        </div>
      </HomeHero>
    </SearchProvider>
  )
}
