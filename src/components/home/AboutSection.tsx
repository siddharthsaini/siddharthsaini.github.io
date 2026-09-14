import { Link } from 'react-router-dom'

export default function AboutSection() {
  return (
    <section id="about" className="space-y-8">
      <p>I'm a software engineer, building systems that power{' '}
        <Link to="https://www.ukg.com/products/ukg-ready" className="underline underline-offset-2">
          UKG Ready
        </Link>.</p>
      <p>
        Based in Delhi and enjoy building and turning ideas into things that work! Occasionally writing about whatever has caught my attention.
      </p>
      <p>
        I'm also into{' '}
        <Link to="/photography" className="underline underline-offset-2">
          photography
        </Link>{' '}
        and spend far too much time on lightroom after every trip.
      </p>
      {/* <p>
        Reach me:{' '}
        <a href="mailto:thesiddharthsaini@gmail.com" className="underline underline-offset-2">
          gmail
        </a>
        {' '}
        <a
          href="https://linkedin.com/in/sidxharth"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          linkedin
        </a>
      </p> */}
    </section>
  )
}
