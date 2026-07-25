import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

interface TerminalPanelProps {
  lines: string[]
}

export default function TerminalPanel({ lines }: TerminalPanelProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>(0.4)
  const [typedCount, setTypedCount] = useState(0)

  const fullText = lines.join('\n')
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!isVisible) return
    if (reduceMotion) {
      setTypedCount(fullText.length)
      return
    }

    let i = 0
    const interval = window.setInterval(() => {
      i += 1
      setTypedCount(i)
      if (i >= fullText.length) window.clearInterval(interval)
    }, 16)

    return () => window.clearInterval(interval)
  }, [isVisible, fullText, reduceMotion])

  const visibleText = fullText.slice(0, typedCount)
  const done = typedCount >= fullText.length

  return (
    <div className="terminal" ref={ref}>
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title mono">modsyncx@web:~</span>
      </div>
      <pre className="terminal-body mono">
        {visibleText}
        <span className={`terminal-cursor ${done ? 'blink' : ''}`}>▍</span>
      </pre>
    </div>
  )
}
