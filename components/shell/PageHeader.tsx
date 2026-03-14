interface PageHeaderProps {
  title: string
  label?: string
  description?: string
  className?: string
}

export default function PageHeader({ label, title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={className}>
      <div className="text-[11px] tracking-[0.14em] text-black/55 uppercase dark:text-white/55">
        {label}
      </div>
      <h1 className="mt-3 text-4xl leading-none font-semibold tracking-tight text-black md:text-6xl dark:text-white">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/72 md:text-base dark:text-white/72">
          {description}
        </p>
      )}
    </div>
  )
}
