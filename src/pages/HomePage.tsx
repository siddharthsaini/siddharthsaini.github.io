import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import AboutSection from '../components/home/AboutSection'
import EducationSection from '../components/home/EducationSection'
import WorkSection from '../components/home/WorkSection'
import ProjectsSection from '../components/home/ProjectsSection'
import BlogSection from '../components/home/BlogSection'

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  return (
    <Layout>
      <AboutSection />
      <div id="tech" className="flex flex-col gap-8">
        <EducationSection />
        <WorkSection />
        <ProjectsSection />
      </div>
      <BlogSection />
    </Layout>
  )
}
