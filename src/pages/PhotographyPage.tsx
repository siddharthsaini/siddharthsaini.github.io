import Layout from '../components/layout/Layout'
import PhotoCollage from '../components/photography/PhotoCollage'

export default function PhotographyPage() {
  return (
    <Layout title="Photography" description="Siddharth Saini's photography." bleed>
      <PhotoCollage />
    </Layout>
  )
}
