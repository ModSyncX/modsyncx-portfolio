export interface LuaChallenge {
  id: string
  starter: string
  validate: (code: string) => boolean
}

export const luaChallenges: LuaChallenge[] = [
  {
    id: 'declare-variable',
    starter: '-- Schreibe deinen Code hier\n',
    validate: (code) => /\blocal\s+level\s*=\s*5\b/.test(code),
  },
  {
    id: 'if-statement',
    starter: 'local cash = 150\n\n-- Schreibe deinen Code hier\n',
    validate: (code) =>
      /\bif\s+cash\s*>=\s*100\s+then\b/.test(code) && /\bend\b/.test(code),
  },
  {
    id: 'for-loop',
    starter: 'local players = {"Nova", "Ari", "Kim"}\n\n-- Schreibe deinen Code hier\n',
    validate: (code) =>
      /\bfor\s+\w+\s*,\s*\w+\s+in\s+ipairs\s*\(\s*players\s*\)\s+do\b/.test(code) &&
      /\bend\b/.test(code),
  },
  {
    id: 'table-create',
    starter: '-- Schreibe deinen Code hier\n',
    validate: (code) =>
      /\blocal\s+player\s*=\s*\{/.test(code) && /\bcash\s*=\s*500\b/.test(code),
  },
  {
    id: 'function-def',
    starter: '-- Schreibe deinen Code hier\n',
    validate: (code) =>
      /\blocal\s+function\s+heal\s*\(/.test(code) && /\bend\b/.test(code),
  },
]
