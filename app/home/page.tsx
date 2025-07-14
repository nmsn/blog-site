import Logo from '@/data/logo-white.svg'
import Header from './Header'
import Footer from './Footer'

export default async function Page() {
  return (
    <header className="flex h-dvh w-full flex-col items-center justify-between">
      <Header />
      <main>
        <Logo />
        <nav>Link</nav>
      </main>
      <Footer />
    </header>
  )
}
