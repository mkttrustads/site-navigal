'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ContactForm from '@/components/forms/ContactForm'
import type { FormType } from '@/content/forms'
import { cn } from '@/lib/utils'

const tabs: { type: FormType; label: string; intro: string }[] = [
  {
    type: 'quote',
    label: 'Request a quote',
    intro: 'Step out of local distributors’ hands and start importing your own product line.',
  },
  {
    type: 'supplier',
    label: 'Become a supplier',
    intro: 'Grow together with Navigal’s clients by registering your company and products.',
  },
]

/** Alterna entre os dois formulários; `?type=supplier` abre direto o de fornecedor. */
export default function ContactTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active: FormType = searchParams.get('type') === 'supplier' ? 'supplier' : 'quote'
  const current = tabs.find((tab) => tab.type === active)!

  return (
    <div>
      <div role="tablist" aria-label="Contact form" className="grid grid-cols-2 gap-1 rounded-card bg-off-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.type}
            type="button"
            role="tab"
            id={`tab-${tab.type}`}
            aria-selected={active === tab.type}
            aria-controls={`panel-${tab.type}`}
            onClick={() => router.replace(tab.type === 'quote' ? pathname : `${pathname}?type=${tab.type}`, { scroll: false })}
            className={cn(
              'rounded-[4px] px-4 py-3 text-sm font-semibold transition-colors sm:text-base',
              active === tab.type ? 'bg-preto text-white' : 'text-preto/70 hover:text-preto'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="mt-8">
        <p className="mb-8 text-lg leading-relaxed text-suave">{current.intro}</p>
        <ContactForm key={active} type={active} />
      </div>
    </div>
  )
}
