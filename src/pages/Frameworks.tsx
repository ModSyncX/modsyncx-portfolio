import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './Frameworks.css'

interface FrameworkCard {
  name: string
  badge: string
  description: string
  bestFor: string
}

interface ComparisonRow {
  name: string
  ecosystem: string
  maintenance: string
  recommendation: string
}

export default function Frameworks() {
  const { t } = useTranslation()
  useDocumentTitle(`${t('frameworks.hero.title')} — ModSyncX`)
  const systems = t('frameworks.intro.systems', { returnObjects: true }) as string[]
  const cards = t('frameworks.cards.items', { returnObjects: true }) as FrameworkCard[]
  const rows = t('frameworks.comparison.rows', { returnObjects: true }) as ComparisonRow[]

  return (
    <>
      <section className="section lua-hero">
        <div className="container">
          <Reveal>
            <Link to="/" className="back-link mono">
              {t('frameworks.back')}
            </Link>
            <p className="eyebrow" style={{ marginTop: 24 }}>
              {t('frameworks.hero.eyebrow')}
            </p>
            <h1 className="section-title" style={{ fontSize: 'clamp(34px, 5.5vw, 56px)' }}>
              {t('frameworks.hero.title')}
            </h1>
            <p className="section-lead">{t('frameworks.hero.description')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section-subtle">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index mono">01 /</span>
              <div>
                <p className="eyebrow">{t('frameworks.intro.eyebrow')}</p>
                <h2 className="section-title">{t('frameworks.intro.title')}</h2>
              </div>
            </div>
            <p className="section-lead">{t('frameworks.intro.lead')}</p>
          </Reveal>

          <Reveal delay={100} className="system-tags">
            {systems.map((system) => (
              <span className="system-tag mono" key={system}>
                {system}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index mono">02 /</span>
              <div>
                <p className="eyebrow">{t('frameworks.cards.eyebrow')}</p>
                <h2 className="section-title">{t('frameworks.cards.title')}</h2>
              </div>
            </div>
            <p className="section-lead">{t('frameworks.cards.lead')}</p>
          </Reveal>

          <div className="framework-grid">
            {cards.map((card, index) => (
              <Reveal key={card.name} delay={index * 80} className="framework-card">
                <div className="framework-card-head">
                  <h3>{card.name}</h3>
                  <span className="framework-badge mono">{card.badge}</span>
                </div>
                <p>{card.description}</p>
                <p className="framework-best-for">
                  <strong>{card.bestFor}</strong>
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="comparison-wrap">
            <h3 className="comparison-title">{t('frameworks.comparison.title')}</h3>
            <div className="comparison-table-scroll">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>{t('frameworks.comparison.headers.name')}</th>
                    <th>{t('frameworks.comparison.headers.ecosystem')}</th>
                    <th>{t('frameworks.comparison.headers.maintenance')}</th>
                    <th>{t('frameworks.comparison.headers.recommendation')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.name}>
                      <td className="mono">{row.name}</td>
                      <td>{row.ecosystem}</td>
                      <td>{row.maintenance}</td>
                      <td>{row.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="comparison-note">{t('frameworks.comparison.note')}</p>
          </Reveal>

          <Reveal delay={260}>
            <p className="framework-positioning">{t('frameworks.positioning')}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
