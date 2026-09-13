import Section from '../ui/Section'
import { workHistory } from '../../lib/data'

export default function WorkSection() {
  return (
    <Section id="work" title="Work">
      <ul className="space-y-4">
        {workHistory.map((entry) => (
          <li key={entry.company} className="flex justify-between gap-4">
            <div>
              <h3 className="font-semibold">{entry.company}</h3>
              <p className="text-sm text-neutral-500">{entry.role}</p>
            </div>
            <p className="shrink-0 text-sm text-neutral-500">{entry.period}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
