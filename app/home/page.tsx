import Logo from '@/data/logo-white.svg'
import Header from './Header'
import Footer from './Footer'
import Link from '@/components/Link'
import { WobbleContent } from '@/components/ui/WobbleContent'

export default async function Page() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-between">
      <main className="flex h-[90vh] w-full flex-col items-center">
        <Header />
        <WobbleContent containerClassName="max-w-[1024px]">
          <div>
            <Logo />
          </div>
        </WobbleContent>
        <nav className="flex translate-y-[-100px] justify-between gap-x-20">
          <Link href="/blog">BLOG</Link>
          <Link href="/projects">PROJECTS</Link>
          <Link href="/travel">TRAVEL</Link>
          <Link href="/about">ABOUT</Link>
        </nav>
      </main>
      <Footer />
    </div>
  )
}
