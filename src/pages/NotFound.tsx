import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  const { t } = useTranslation()
  useDocumentTitle(`404 — ModSyncX`)

  return (
    <section className="section not-found">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{t('notFound.eyebrow')}</p>
          <h1 className="not-found-code mono">404</h1>
          <h2 className="section-title">{t('notFound.title')}</h2>
          <p className="section-lead">{t('notFound.description')}</p>
          <Link to="/" className="button button-primary" style={{ marginTop: 32 }}>
            {t('notFound.button')}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
