import { useTranslation } from 'react-i18next'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import FrameworksTeaser from '../components/FrameworksTeaser'
import Contact from '../components/Contact'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './Home.css'

export default function Home() {
  const { t } = useTranslation()
  useDocumentTitle(`ModSyncX — ${t('hero.subtitle')}`)

  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <FrameworksTeaser />
      <Contact />
    </>
  )
}
