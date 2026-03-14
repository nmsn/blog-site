import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="border-b border-black/8 pb-8">
        <div className="text-[11px] tracking-[0.14em] text-black/45 uppercase">Profile</div>
        <h1 className="mt-3 text-4xl leading-none font-semibold tracking-tight text-[#0d1a27] md:text-6xl">
          About
        </h1>
      </div>

      <div className="items-start gap-x-12 pt-8 xl:grid xl:grid-cols-[280px_minmax(0,1fr)] xl:pt-10">
        <div className="flex flex-col items-center border border-black/6 bg-white/32 px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-sm">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />
          )}

          <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight text-[#102131]">
            {name}
          </h3>
          <div className="text-black/55">{occupation}</div>
          <div className="text-black/55">{company}</div>

          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={twitter} />
            <SocialIcon kind="bluesky" href={bluesky} />
          </div>
        </div>

        <div className="prose max-w-none pt-10 pb-8 text-black/74 xl:pt-2">{children}</div>
      </div>
    </div>
  )
}
