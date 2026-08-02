import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { windowsSteps, linuxSteps, type SetupStep } from '../data/serverSetup'
import { applyVars } from '../utils/applyVars'
import './ServerSetup.css'

interface RequirementItem {
  label: string
  detail: string
}

interface StepText {
  title: string
  body: string
}

interface PitfallItem {
  title: string
  body: string
}

type OS = 'windows' | 'linux'

// Bewusst ohne highlightLua: das highlightet Lua-Keywords, hier stehen aber
// Shell-Befehle und server.cfg – da wäre die Färbung schlicht falsch.
function CommandWindow({ step, vars }: { step: SetupStep; vars: Record<string, string> }) {
  return (
    <div className="code-window">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title mono">{applyVars(step.filename, vars)}</span>
      </div>
      <pre className="code-body mono">{applyVars(step.code, vars)}</pre>
    </div>
  )
}

export default function ServerSetup() {
  const { t } = useTranslation()
  useDocumentTitle(`${t('server.hero.title')} — ModSyncX`)
  const [os, setOs] = useState<OS>('windows')

  const requirements = t('server.requirements.items', { returnObjects: true }) as RequirementItem[]
  const windowsText = t('server.setup.windows', { returnObjects: true }) as StepText[]
  const linuxText = t('server.setup.linux', { returnObjects: true }) as StepText[]
  const pitfalls = t('server.pitfalls.items', { returnObjects: true }) as PitfallItem[]
  const snippetVars = t('server.setup.snippets', { returnObjects: true }) as Record<string, string>

  const steps = os === 'windows' ? windowsSteps : linuxSteps
  const stepTexts = os === 'windows' ? windowsText : linuxText

  return (
    <>
      <section className="section lua-hero">
        <div className="container">
          <Reveal>
            <Link to="/" className="back-link mono">
              {t('server.back')}
            </Link>
            <p className="eyebrow" style={{ marginTop: 24 }}>
              {t('server.hero.eyebrow')}
            </p>
            <h1 className="section-title" style={{ fontSize: 'clamp(34px, 5.5vw, 56px)' }}>
              {t('server.hero.title')}
            </h1>
            <p className="section-lead">{t('server.hero.description')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section-subtle">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index mono">01 /</span>
              <div>
                <p className="eyebrow">{t('server.requirements.eyebrow')}</p>
                <h2 className="section-title">{t('server.requirements.title')}</h2>
              </div>
            </div>
            <p className="section-lead">{t('server.requirements.lead')}</p>
          </Reveal>

          <div className="requirement-grid">
            {requirements.map((item, index) => (
              <Reveal key={item.label} delay={index * 70} className="requirement-card">
                <span className="skill-index mono">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index mono">02 /</span>
              <div>
                <p className="eyebrow">{t('server.setup.eyebrow')}</p>
                <h2 className="section-title">{t('server.setup.title')}</h2>
              </div>
            </div>
            <p className="section-lead">{t('server.setup.lead')}</p>
          </Reveal>

          <Reveal delay={80} className="os-toggle">
            <button
              aria-pressed={os === 'windows'}
              className={`os-tab mono ${os === 'windows' ? 'active' : ''}`}
              onClick={() => setOs('windows')}
            >
              {t('server.setup.windowsLabel')}
            </button>
            <button
              aria-pressed={os === 'linux'}
              className={`os-tab mono ${os === 'linux' ? 'active' : ''}`}
              onClick={() => setOs('linux')}
            >
              {t('server.setup.linuxLabel')}
            </button>
          </Reveal>

          {os === 'linux' && (
            <Reveal className="setup-note">
              <p>{t('server.setup.note')}</p>
            </Reveal>
          )}

          <div className="setup-list">
            {steps.map((step, index) => {
              const text = stepTexts[index]
              return (
                <Reveal key={step.id} delay={index * 60} className="setup-row">
                  <div className="setup-copy">
                    <span className="skill-index mono">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{text.title}</h3>
                    <p>{text.body}</p>
                  </div>
                  <CommandWindow step={step} vars={snippetVars} />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-subtle">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index mono">03 /</span>
              <div>
                <p className="eyebrow">{t('server.pitfalls.eyebrow')}</p>
                <h2 className="section-title">{t('server.pitfalls.title')}</h2>
              </div>
            </div>
          </Reveal>

          <div className="pitfall-list">
            {pitfalls.map((item, index) => (
              <Reveal key={item.title} delay={index * 60} className="pitfall-card">
                <span className="pitfall-mark mono">!</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="framework-positioning">
              {t('server.outro')}{' '}
              <Link to="/frameworks" className="setup-outro-link">
                {t('server.outroLink')}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
