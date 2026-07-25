import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import TerminalPanel from './TerminalPanel'

interface TerminalLine {
  cmd: string
  out: string
}

export default function Hero() {
  const { t } = useTranslation()
  const terminalLines = t('hero.terminal', { returnObjects: true }) as TerminalLine[]
  const flatLines = terminalLines.flatMap((line) => [`$ ${line.cmd}`, `> ${line.out}`])

  return (
    <section id="about" className="hero">
      <div className="container hero-grid">
        <Reveal className="hero-copy">
          <span className="badge">
            <span className="badge-dot" />
            {t('hero.badge')}
          </span>
          <p className="eyebrow" style={{ marginTop: 28 }}>
            {t('hero.eyebrow')}
          </p>
          <h1 className="hero-title">
            Mod<em>Sync</em>X
          </h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">
              {t('hero.ctaPrimary')}
            </a>
            <a href="#skills" className="button button-secondary">
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="hero-terminal-wrap">
          <TerminalPanel lines={flatLines} />
        </Reveal>
      </div>
    </section>
  )
}
