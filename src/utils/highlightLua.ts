const KEYWORDS =
  /\b(local|function|end|if|then|else|elseif|return|and|or|not|nil|true|false|while|do|for|in|repeat|until|break)\b/

function escapeHtml(input: string) {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const TOKEN_PATTERN = new RegExp(
  [
    /(--.*$)/.source, // comment
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/.source, // string
    KEYWORDS.source, // keyword
    /\b(\d+(?:\.\d+)?)\b/.source, // number
    /\b([A-Za-z_][A-Za-z0-9_]*)(?=\s*\()/.source, // function call
  ].join('|'),
  'gm',
)

export function highlightLua(code: string): string {
  const escaped = escapeHtml(code)

  return escaped.replace(
    TOKEN_PATTERN,
    (match, comment, string, keyword, number, fn) => {
      if (comment) return `<span class="tok-comment">${comment}</span>`
      if (string) return `<span class="tok-string">${string}</span>`
      if (keyword) return `<span class="tok-keyword">${keyword}</span>`
      if (number) return `<span class="tok-number">${number}</span>`
      if (fn) return `<span class="tok-function">${fn}</span>`
      return match
    },
  )
}
