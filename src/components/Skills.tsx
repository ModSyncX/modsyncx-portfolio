import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

interface SkillItem {
  title: string
  description: string
}

export default function Skills() {
  const { t } = useTranslation()
  const items = t('skills.items', { returnObjects: true }) as SkillItem[]

  return (
    <section id="skills" className="section section-subtle">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index mono">02 /</span>
            <div>
              <p className="eyebrow">{t('skills.eyebrow')}</p>
              <h2 className="section-title">{t('skills.title')}</h2>
            </div>
          </div>
          <p className="section-lead">{t('skills.lead')}</p>
        </Reveal>

        <div className="skills-grid">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70} className="skill-card">
              <span className="skill-index mono">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="skill-corner skill-corner-tl" />
              <span className="skill-corner skill-corner-br" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
