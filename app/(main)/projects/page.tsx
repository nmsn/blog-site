import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/shell/PageHeader'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <div className="mx-auto w-full max-w-6xl pb-14 md:pb-20">
      <PageHeader title="Projects" className="pb-8" />
      <div className="-m-4 flex flex-wrap">
        {projectsData.map((d) => (
          <Card
            key={d.title}
            title={d.title}
            description={d.description}
            imgSrc={d.imgSrc}
            href={d.href}
          />
        ))}
      </div>
    </div>
  )
}
