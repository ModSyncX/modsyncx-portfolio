import { highlightLua } from '../utils/highlightLua'

interface CodeBlockProps {
  filename: string
  code: string
}

export default function CodeBlock({ filename, code }: CodeBlockProps) {
  return (
    <div className="code-window">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title mono">{filename}</span>
      </div>
      <pre className="code-body mono" dangerouslySetInnerHTML={{ __html: highlightLua(code) }} />
    </div>
  )
}
