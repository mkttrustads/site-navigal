'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { cn } from '@/lib/utils'
import type { FormType } from '@/content/forms'

const inputClass =
  'w-full rounded-card border border-linha bg-white px-4 py-3 text-base text-preto outline-none transition focus:border-cobalto focus:ring-2 focus:ring-cobalto/20'

export default function ContactForm({ type }: { type: FormType }) {
  const {
    t,
    content: { company, formFields },
  } = useI18n()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type }),
      })
      setStatus(response.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-cobalto/30 bg-cobalto/5 p-8" role="status">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-cobalto" />
        <h3 className="text-2xl">{t('form.thanks')}</h3>
        <p className="text-base leading-relaxed text-suave">{t('form.thanksBody')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {formFields[type].map((field) => {
        const id = `${type}-${field.name}`
        return (
          <div key={field.name} className={cn(field.wide && 'sm:col-span-2')}>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-preto">
              {field.label}
              {field.required && (
                <span className="text-cobalto" aria-hidden="true">
                  {' '}
                  *
                </span>
              )}
            </label>
            {field.type === 'textarea' ? (
              <textarea id={id} name={field.name} rows={5} maxLength={2000} className={inputClass} />
            ) : field.type === 'select' ? (
              <select id={id} name={field.name} defaultValue="" className={inputClass}>
                <option value="" disabled>
                  {t('form.select')}
                </option>
                {field.options?.map((option) => (
                  // O valor enviado fica em inglês (o e-mail para o comercial não muda); só o texto exibido é traduzido.
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.type ?? 'text'}
                required={field.required}
                placeholder={field.placeholder}
                autoComplete={
                  field.name === 'email'
                    ? 'email'
                    : field.name === 'phone'
                      ? 'tel'
                      : field.name === 'company'
                        ? 'organization'
                        : field.name === 'firstName'
                          ? 'given-name'
                          : field.name === 'lastName'
                            ? 'family-name'
                            : field.name === 'country'
                              ? 'country-name'
                              : undefined
                }
                className={inputClass}
              />
            )}
          </div>
        )
      })}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-suave">
          <span className="text-cobalto">*</span> {t('form.required')}
        </p>
        <Button type="submit" arrow disabled={status === 'sending'} className="disabled:opacity-60">
          {status === 'sending' ? t('form.sending') : t(type === 'quote' ? 'form.submit.quote' : 'form.submit.supplier')}
        </Button>
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-card border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2">
          {t('form.error')}{' '}
          <a href={`mailto:${company.email}`} className="font-semibold underline">
            {company.email}
          </a>
          .
        </p>
      )}
    </form>
  )
}
