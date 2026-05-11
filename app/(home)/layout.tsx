import { SearchProvider, SearchConfig } from 'pliny/search'
import HomeHero from '@/components/home/HomeHero'
import siteMetadata from '@/data/siteMetadata'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
      <HomeHero>{children}</HomeHero>
    </SearchProvider>
  )
}
