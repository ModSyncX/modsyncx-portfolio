import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'

export default function FrameworksTeaser() {
  const { t } = useTranslation()

  return (
    <section className="teaser-strip">
      <div className="container teaser-inner">
        <Reveal className="teaser-copy">
          <p className="eyebrow">{t('frameworksTeaser.eyebrow')}</p>
          <h2 className="teaser-title">{t('frameworksTeaser.title')}</h2>
          <p className="teaser-lead">{t('frameworksTeaser.lead')}</p>
        </Reveal>
        <Reveal delay={100}>
          <Link to="/frameworks" className="button button-primary">
            {t('frameworksTeaser.button')}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
