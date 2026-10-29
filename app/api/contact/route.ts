import { Resend } from 'resend'
import { formFields, type FormType } from '@/content/forms'

const DESTINATION = 'contact@navigal-ts.com'

// Remetente padrão da Resend, que funciona sem verificar domínio. Assim que
// navigal-ts.com estiver verificado na Resend, trocar por algo como
// 'Navigal Website <website@navigal-ts.com>'.
const SENDER = 'Navigal Website <onboarding@resend.dev>'

const subjects: Record<FormType, string> = {
  quote: 'Quote request',
  supplier: 'Supplier registration',
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  const data = (await request.json()) as Record<string, unknown>
  const type = data.type
  if (type !== 'quote' && type !== 'supplier') {
    return Response.json({ ok: false, error: 'Invalid form type.' }, { status: 400 })
  }

  const fields = formFields[type]
  const values = Object.fromEntries(
    fields.map((field) => [field.name, typeof data[field.name] === 'string' ? (data[field.name] as string).trim().slice(0, 2000) : ''])
  )
  const missing = fields.filter((field) => field.required && !values[field.name])
  if (missing.length > 0) {
    return Response.json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Sem a chave (Vercel > Settings > Environment Variables > RESEND_API_KEY)
    // o lead não sai daqui: falhar alto no log em vez de responder "ok" e
    // perder o contato em silêncio.
    console.error('RESEND_API_KEY missing, lead not sent:', values)
    return Response.json({ ok: false, error: 'Email delivery not configured.' }, { status: 500 })
  }

  const rows = fields.filter((field) => values[field.name]).map((field) => [field.label, values[field.name]])
  const subject = `${subjects[type]} - ${values.company.replace(/[\r\n]+/g, ' ')}`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: SENDER,
      to: DESTINATION,
      replyTo: values.email,
      subject,
      text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: `<table style="font-family:Arial,sans-serif;font-size:14px;color:#0D0D0D">${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;font-weight:600;vertical-align:top">${label}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
        )
        .join('')}</table>`,
    })
    if (error) {
      console.error('Resend rejected the message:', error)
      return Response.json({ ok: false, error: 'Failed to send.' }, { status: 502 })
    }
  } catch (err) {
    console.error('Unexpected error sending lead:', err)
    return Response.json({ ok: false, error: 'Failed to send.' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
