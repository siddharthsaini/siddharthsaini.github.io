import Section from '../ui/Section'
import { education } from '../../lib/data'

export default function EducationSection() {
  return (
    <Section id="education" title="Education">
      <ul className="space-y-4">
        {education.map((entry) => (
          <li key={entry.institution} className="flex justify-between gap-4">
            <div>
              <h3 className="font-semibold">{entry.institution}</h3>
              <p className="text-sm text-neutral-500">{entry.degree}</p>
              <p className="text-sm text-neutral-500">{entry.location}</p>
            </div>
            <p className="shrink-0 text-sm text-neutral-500">{entry.period}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
