// Ersetzt {{token}}-Platzhalter in einem String durch übersetzte Werte aus i18n.
// Wird für die Code-/Terminal-Fenster genutzt, damit Kommentare und Beispiel-
// Strings der eingestellten Sprache folgen, ohne die Befehle 6× zu duplizieren.
export function applyVars(str: string, vars: Record<string, string>): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}
