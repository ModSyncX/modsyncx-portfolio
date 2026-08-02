import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'
import { supportedLanguages } from '../i18n'
import './MiniTerminal.css'

interface Line {
  type: 'input' | 'output'
  text: string
}

const PROMPT = 'guest@modsyncx:~$'

const BANNER = [
  '┌───────────────────────────────┐',
  '│   //  M o d S y n c X          │',
  '│   FiveM · Discord · Lua        │',
  '└───────────────────────────────┘',
].join('\n')

export default function MiniTerminal() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const [lines, setLines] = useState<Line[]>([{ type: 'output', text: t('terminal.welcome') }])
  const [value, setValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' })
  }, [lines])

  function print(text: string) {
    setLines((prev) => [...prev, { type: 'output', text }])
  }

  function runCommand(raw: string) {
    const cmd = raw.trim()
    if (!cmd) return
    setLines((prev) => [...prev, { type: 'input', text: cmd }])

    const [name, ...args] = cmd.toLowerCase().split(/\s+/)

    switch (name) {
      case 'help':
        print(t('terminal.help'))
        break
      case 'about':
        navigate('/#about')
        print(t('terminal.navigating', { target: 'about' }))
        break
      case 'skills':
        navigate('/#skills')
        print(t('terminal.navigating', { target: 'skills' }))
        break
      case 'projects':
        navigate('/#projects')
        print(t('terminal.navigating', { target: 'projects' }))
        break
      case 'contact':
        navigate('/#contact')
        print(t('terminal.navigating', { target: 'contact' }))
        break
      case 'lua':
        navigate('/lua')
        print(t('terminal.navigating', { target: 'lua' }))
        break
      case 'frameworks':
        navigate('/frameworks')
        print(t('terminal.navigating', { target: 'frameworks' }))
        break
      case 'server':
        navigate('/server')
        print(t('terminal.navigating', { target: 'server' }))
        break
      case 'home':
        navigate('/')
        print(t('terminal.navigating', { target: 'home' }))
        break
      case 'ls':
        print('about  skills  projects  contact  lua  frameworks  server')
        break
      case 'stack':
        print('Lua · TypeScript · JavaScript · Python')
        break
      case 'echo':
        print(args.length ? cmd.slice(cmd.indexOf(' ') + 1) : '')
        break
      case 'history': {
        const history = lines
          .filter((l) => l.type === 'input')
          .map((l, i) => `${String(i + 1).padStart(2, ' ')}  ${l.text}`)
        print(history.length ? history.join('\n') : '—')
        break
      }
      case 'banner':
        print(BANNER)
        break
      case 'whoami':
        print('guest')
        break
      case 'theme':
        toggleTheme()
        print(t('terminal.themeToggled'))
        break
      case 'lang': {
        const code = args[0]
        if (code && supportedLanguages.some((l) => l.code === code)) {
          i18n.changeLanguage(code)
          print(t('terminal.langChanged', { code }))
        } else {
          print(t('terminal.langUsage'))
        }
        break
      }
      case 'sudo':
        print(t('terminal.sudo'))
        break
      case 'date':
        print(new Date().toString())
        break
      case 'github':
        window.open('https://github.com/ModSyncX', '_blank', 'noreferrer')
        print('https://github.com/ModSyncX')
        break
      case 'email':
        print('modsyncx@gmail.com')
        break
      case 'clear':
        setLines([])
        return
      default:
        print(t('terminal.unknown', { cmd: name }))
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    runCommand(value)
    setValue('')
  }

  return (
    <div className="mini-terminal">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title mono">{PROMPT.replace('$', '')}</span>
      </div>

      <div className="mini-terminal-output mono">
        {lines.map((line, index) => (
          <div key={index} className={line.type === 'input' ? 'mt-input-line' : 'mt-output-line'}>
            {line.type === 'input' ? `${PROMPT} ${line.text}` : line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form className="mini-terminal-form" onSubmit={handleSubmit}>
        <span className="mono mt-prompt">$</span>
        <input
          className="mono mt-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t('terminal.placeholder')}
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal input"
        />
      </form>
    </div>
  )
}
