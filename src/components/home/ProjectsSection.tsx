import Section from '../ui/Section'
import { projects } from '../../lib/data'

const linkClass = 'text-sm text-neutral-500'

export default function ProjectsSection() {
  return (
    <Section id="projects" title="Projects">
      <ul className="space-y-4">
        {projects.map((entry) => (
          <li key={entry.name} className="flex justify-between gap-4">
            <div>
              <h3 className="font-semibold">{entry.name}</h3>
              <p className="text-sm text-neutral-500">{entry.description}</p>
            </div>
            <div className="flex shrink-0 gap-3">
              {entry.codeUrl && (
                <a href={entry.codeUrl} target="_blank" rel="noreferrer" className={linkClass}>
                  Code
                </a>
              )}
              {entry.url && (
                <a href={entry.url} target="_blank" rel="noreferrer" className={linkClass}>
                  {entry.linkLabel ?? 'Link'}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
