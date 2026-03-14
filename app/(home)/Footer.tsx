import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
            className="text-white/72 hover:text-white"
            iconClassName="text-white/82 hover:text-white dark:text-white/82 dark:hover:text-white"
          />
          <SocialIcon
            kind="github"
            href={siteMetadata.github}
            size={6}
            className="text-white/72 hover:text-white"
            iconClassName="text-white/82 hover:text-white dark:text-white/82 dark:hover:text-white"
          />
          <SocialIcon
            kind="linkedin"
            href={siteMetadata.linkedin}
            size={6}
            className="text-white/72 hover:text-white"
            iconClassName="text-white/82 hover:text-white dark:text-white/82 dark:hover:text-white"
          />
          <SocialIcon
            kind="twitter"
            href={siteMetadata.twitter}
            size={6}
            className="text-white/72 hover:text-white"
            iconClassName="text-white/82 hover:text-white dark:text-white/82 dark:hover:text-white"
          />
          <SocialIcon
            kind="x"
            href={siteMetadata.x}
            size={6}
            className="text-white/72 hover:text-white"
            iconClassName="text-white/82 hover:text-white dark:text-white/82 dark:hover:text-white"
          />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-white/68">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" className="text-white/78 transition-colors hover:text-white">
            {siteMetadata.title}
          </Link>
        </div>
      </div>
    </footer>
  )
}
