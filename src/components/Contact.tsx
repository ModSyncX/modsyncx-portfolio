import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import ContactForm from './ContactForm'

const GITHUB_URL = 'https://github.com/ModSyncX'
// TODO: echten Discord-Invite/Profil-Link eintragen, sobald vorhanden.
const DISCORD_URL = '#'
const EMAIL = 'modsyncx@gmail.com'

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.17.69-3.84-1.34-3.84-1.34-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.17a10.86 10.86 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.34-5.2 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.37a17.9 17.9 0 0 0-4.43-1.37c-.19.34-.4.79-.55 1.15a16.6 16.6 0 0 0-4.92 0 8.9 8.9 0 0 0-.56-1.15 17.8 17.8 0 0 0-4.43 1.37C2.6 8.06 1.9 11.65 2.24 15.19a17.98 17.98 0 0 0 5.49 2.79c.44-.6.84-1.24 1.18-1.92-.65-.24-1.27-.55-1.85-.9.15-.11.3-.23.45-.35a12.7 12.7 0 0 0 10.98 0c.15.13.3.24.45.35-.58.36-1.2.66-1.85.9.34.68.73 1.32 1.18 1.92a17.9 17.9 0 0 0 5.49-2.79c.4-4.1-.66-7.66-2.44-10.82ZM9.68 13.7c-.83 0-1.5-.77-1.5-1.71 0-.95.66-1.72 1.5-1.72s1.52.78 1.5 1.72c0 .94-.66 1.71-1.5 1.71Zm4.64 0c-.83 0-1.5-.77-1.5-1.71 0-.95.66-1.72 1.5-1.72s1.52.78 1.5 1.72c0 .94-.66 1.71-1.5 1.71Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6 8.5 6.5L20.5 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index mono">04 /</span>
            <div>
              <p className="eyebrow">{t('contact.eyebrow')}</p>
              <h2 className="section-title">{t('contact.title')}</h2>
            </div>
          </div>
          <p className="section-lead">{t('contact.lead')}</p>
        </Reveal>

        <Reveal delay={120} className="contact-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-icon">
              <GithubIcon />
            </span>
            {t('contact.github')}
          </a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-icon">
              <DiscordIcon />
            </span>
            {t('contact.discord')}
          </a>
          <a href={`mailto:${EMAIL}`} className="contact-link">
            <span className="contact-icon">
              <MailIcon />
            </span>
            {t('contact.email')}
          </a>
        </Reveal>

        <Reveal delay={200} className="contact-form-wrap">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
