interface PageHeaderProps {
  label: string
  title: string
  description?: string
  className?: string
}

export default function PageHeader({ label, title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={className}>
      <div className="text-[11px] tracking-[0.14em] text-black/45 uppercase">{label}</div>
      <h1 className="mt-3 text-4xl leading-none font-semibold tracking-tight text-[#0d1a27] md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60 md:text-base">{description}</p>
      )}
    </div>
  )
}
