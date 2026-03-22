import { SearchProvider, SearchConfig } from 'pliny/search'
import HomeHero from '@/components/home/HomeHero'
import siteMetadata from '@/data/siteMetadata'
import HeaderActions from '@/components/header/HeaderActions'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh overflow-hidden bg-white dark:bg-black">
      <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
        <HomeHero>
          <div>
            <div className="sticky top-0 z-30 bg-white/92 px-10 py-10 backdrop-blur-md md:mb-8 dark:bg-black/92">
              <HeaderActions showMobileNav />
            </div>
            {children}
          </div>
        </HomeHero>
      </SearchProvider>
    </div>
  )
}
