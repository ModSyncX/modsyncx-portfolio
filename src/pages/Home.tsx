import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import FrameworksTeaser from '../components/FrameworksTeaser'
import Contact from '../components/Contact'
import './Home.css'

export default function Home() {
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
