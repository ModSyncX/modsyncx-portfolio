import { useTranslation } from 'react-i18next'
import MiniTerminal from './MiniTerminal'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-terminal-wrap">
        <MiniTerminal />
      </div>
      <div className="container footer-inner">
        <span>ModSyncX © {year}</span>
        <span>{t('footer.rights')}</span>
      </div>
    </footer>
  )
}
