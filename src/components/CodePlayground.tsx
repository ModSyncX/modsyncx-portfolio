import { useState } from 'react'
import type { LuaChallenge } from '../data/luaChallenges'

interface CodePlaygroundProps {
  filename: string
  challenge: LuaChallenge
  starter: string
  checkLabel: string
  resetLabel: string
  hintLabel: string
  hintText: string
  correctLabel: string
  incorrectLabel: string
}

export default function CodePlayground({
  filename,
  challenge,
  starter,
  checkLabel,
  resetLabel,
  hintLabel,
  hintText,
  correctLabel,
  incorrectLabel,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(starter)
  const [result, setResult] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const [hintVisible, setHintVisible] = useState(false)

  function handleCheck() {
    setResult(challenge.validate(code) ? 'correct' : 'incorrect')
  }

  function handleReset() {
    setCode(starter)
    setResult('idle')
    setHintVisible(false)
  }

  return (
    <div className="code-window">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title mono">{filename}</span>
      </div>

      <textarea
        className="code-editor mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        rows={6}
      />

      <div className="playground-actions">
        <button className="button button-primary" onClick={handleCheck}>
          {checkLabel}
        </button>
        <button className="button button-secondary" onClick={handleReset}>
          {resetLabel}
        </button>
        <button className="hint-toggle mono" onClick={() => setHintVisible((v) => !v)}>
          {hintLabel}
        </button>
      </div>

      {result !== 'idle' && (
        <p className={`playground-feedback ${result}`} role="status">
          {result === 'correct' ? correctLabel : incorrectLabel}
        </p>
      )}

      {hintVisible && <p className="playground-hint">{hintText}</p>}
    </div>
  )
}
