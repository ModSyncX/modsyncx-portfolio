import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

interface ProjectData {
  name: string
  tagline: string
  stack: string
  description: string
  features: string[]
}

export default function Projects() {
  const { t } = useTranslation()
  const project = t('projects.ticketbot', { returnObjects: true }) as ProjectData

  return (
    <section id="projects" className="section section-subtle">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index mono">03 /</span>
            <div>
              <p className="eyebrow">{t('projects.eyebrow')}</p>
              <h2 className="section-title">{t('projects.title')}</h2>
            </div>
          </div>
          <p className="section-lead">{t('projects.lead')}</p>
        </Reveal>

        <Reveal delay={100} className="project-card">
          <div className="project-card-head">
            <div>
              <h3>{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
            </div>
            <span className="project-stack mono">{project.stack}</span>
          </div>

          <p className="project-description">{project.description}</p>

          <ul className="project-features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
