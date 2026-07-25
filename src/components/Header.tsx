import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { supportedLanguages } from '../i18n'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [langOpen, setLangOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)

  const currentLang =
    supportedLanguages.find((l) => l.code === i18n.language) ?? supportedLanguages[1]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-mark mono">//</span>ModSyncX
        </Link>

        <nav className="nav">
          <Link to="/#about">
            <span className="nav-index mono">01</span>
            {t('nav.about')}
          </Link>
          <Link to="/#skills">
            <span className="nav-index mono">02</span>
            {t('nav.skills')}
          </Link>
          <Link to="/#projects">
            <span className="nav-index mono">03</span>
            {t('nav.projects')}
          </Link>
          <Link to="/#contact">
            <span className="nav-index mono">04</span>
            {t('nav.contact')}
          </Link>
          <Link to="/lua">
            <span className="nav-index mono">{'</>'}</span>
            {t('lua.nav')}
          </Link>
          <Link to="/frameworks">
            <span className="nav-index mono">{'{}'}</span>
            {t('frameworks.nav')}
          </Link>
        </nav>

        <div className="header-actions">
          <div className="lang-menu" ref={langMenuRef}>
            <button
              className="icon-button lang-button"
              onClick={() => setLangOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <span>{currentLang.flag}</span>
              <span className="lang-code">{currentLang.code.toUpperCase()}</span>
            </button>
            {langOpen && (
              <ul className="lang-dropdown" role="listbox">
                {supportedLanguages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      className={lang.code === i18n.language ? 'active' : ''}
                      onClick={() => {
                        i18n.changeLanguage(lang.code)
                        setLangOpen(false)
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}
