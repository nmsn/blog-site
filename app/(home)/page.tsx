import Logo from '@/data/logo.svg'
import Header from './Header'
import Footer from '@/components/Footer'
import Link from '@/components/Link'
import { WobbleContent } from '@/components/ui/WobbleContent'
import headerNavLinks from '@/data/headerNavLinks'
import Particles from '@/components/ui/Particles'

export default async function Page() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-between">
      <Particles
        particleColors={['#27A6DE']}
        particleCount={500}
        moveParticlesOnHover={true}
        className="-z-1"
      />

      <main className="flex h-[90vh] w-full flex-col items-center">
        <Header />
        <WobbleContent containerClassName="max-w-[480px] mt-20">
          <Link href="/">
            <Logo />
          </Link>
        </WobbleContent>
        <nav className="mt-20 flex justify-between gap-x-20">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
        </nav>
      </main>
      <Footer />
    </div>
  )
}
