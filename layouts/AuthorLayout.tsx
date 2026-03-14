import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import PageHeader from '@/components/shell/PageHeader'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <div className="mx-auto w-full max-w-6xl pb-14 md:pb-20">
      <PageHeader title="About" className="pb-8" />

      <div className="items-start gap-x-12 pt-8 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:pt-10">
        <div className="flex flex-col items-center border border-black/12 bg-white px-6 py-8 dark:border-white/15 dark:bg-black">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />
          )}

          <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight text-black dark:text-white">
            {name}
          </h3>
          <div className="text-black/72 dark:text-white/72">{occupation}</div>
          <div className="text-black/72 dark:text-white/72">{company}</div>

          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={twitter} />
            <SocialIcon kind="bluesky" href={bluesky} />
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none pt-10 pb-8 text-black/78 xl:pt-2 dark:text-white/78">
          {children}
        </div>
      </div>
    </div>
  )
}
