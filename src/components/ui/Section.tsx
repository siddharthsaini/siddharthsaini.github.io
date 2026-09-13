interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 id={id} className="font-semibold">
          {title}
        </h2>
        <div className="flex-1 border-t border-neutral-300" />
      </div>
      {children}
    </section>
  )
}
