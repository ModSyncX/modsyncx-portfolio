import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import CodeBlock from '../components/CodeBlock'
import CodePlayground from '../components/CodePlayground'
import { luaLessons } from '../data/luaLessons'
import { luaChallenges } from '../data/luaChallenges'
import { applyVars } from '../utils/applyVars'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './LearnLua.css'

interface LessonText {
  title: string
  description: string
}

interface ChallengeText {
  title: string
  instructions: string
  hint: string
}

export default function LearnLua() {
  const { t, i18n } = useTranslation()
  useDocumentTitle(`${t('lua.hero.title')} — ModSyncX`)
  const lessonTexts = t('lua.sections.items', { returnObjects: true }) as LessonText[]
  const challengeTexts = t('lua.playground.challenges', { returnObjects: true }) as ChallengeText[]
  // Übersetzbare Strings/Kommentare in den Lua-Code-Fenstern (siehe lua.code).
  const codeVars = t('lua.code', { returnObjects: true }) as Record<string, string>

  return (
    <>
      <section className="section lua-hero">
        <div className="container">
          <Reveal>
            <Link to="/" className="back-link mono">
              {t('lua.back')}
            </Link>
            <p className="eyebrow" style={{ marginTop: 24 }}>
              {t('lua.hero.eyebrow')}
            </p>
            <h1 className="section-title" style={{ fontSize: 'clamp(34px, 5.5vw, 56px)' }}>
              {t('lua.hero.title')}
            </h1>
            <p className="section-lead">{t('lua.hero.description')}</p>
          </Reveal>
        </div>
      </section>

      <section id="lua-basics" className="section section-subtle">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index mono">01 /</span>
              <div>
                <p className="eyebrow">{t('lua.sections.eyebrow')}</p>
                <h2 className="section-title">{t('lua.sections.title')}</h2>
              </div>
            </div>
            <p className="section-lead">{t('lua.sections.lead')}</p>
          </Reveal>

          <div className="lesson-list">
            {luaLessons.map((lesson, index) => {
              const text = lessonTexts[index]
              return (
                <Reveal key={lesson.id} delay={index * 60} className="lesson-row">
                  <div className="lesson-copy">
                    <span className="skill-index mono">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{text.title}</h3>
                    <p>{text.description}</p>
                  </div>
                  <CodeBlock filename={lesson.filename} code={applyVars(lesson.code, codeVars)} />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section id="lua-playground" className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="section-index mono">02 /</span>
              <div>
                <p className="eyebrow">{t('lua.playground.eyebrow')}</p>
                <h2 className="section-title">{t('lua.playground.title')}</h2>
              </div>
            </div>
            <p className="section-lead">{t('lua.playground.lead')}</p>
          </Reveal>

          <div className="challenge-list">
            {luaChallenges.map((challenge, index) => {
              const text = challengeTexts[index]
              return (
                <Reveal key={challenge.id} delay={index * 70} className="challenge-row">
                  <span className="skill-index mono">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{text.title}</h3>
                  <p className="challenge-instructions">{text.instructions}</p>
                  <CodePlayground
                    key={i18n.language}
                    filename={`challenge-${index + 1}.lua`}
                    challenge={challenge}
                    starter={applyVars(challenge.starter, codeVars)}
                    checkLabel={t('lua.playground.checkButton')}
                    resetLabel={t('lua.playground.resetButton')}
                    hintLabel={t('lua.playground.hintButton')}
                    hintText={text.hint}
                    correctLabel={t('lua.playground.correct')}
                    incorrectLabel={t('lua.playground.incorrect')}
                  />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
