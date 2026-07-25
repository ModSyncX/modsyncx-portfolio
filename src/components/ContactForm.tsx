import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqergnpe'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="form-feedback success">{t('contact.form.success')}</p>
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">{t('contact.form.name')}</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="form-row">
        <label htmlFor="email">{t('contact.form.email')}</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="form-row">
        <label htmlFor="message">{t('contact.form.message')}</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      <button type="submit" className="button button-primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('contact.form.sending') : t('contact.form.send')}
      </button>

      {status === 'error' && <p className="form-feedback error">{t('contact.form.error')}</p>}
    </form>
  )
}
