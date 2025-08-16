import Image from 'next/image'

const Item = ({
  title,
  icon,
  description,
  tags,
}: {
  title: string
  icon?: string
  description: string
  tags?: string[]
}) => {
  return (
    <div>
      <div>
        {icon ? <Image src={icon} alt={title} /> : null}
        <span>{title}</span>
      </div>
      <section>{description}</section>
      {tags?.map((tag) => <div key={tag}>{tag}</div>)}
    </div>
  )
}

export default Item
