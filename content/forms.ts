// Campos dos formulários, compartilhados entre o componente (cliente) e a
// rota /api/contact (servidor), que valida os obrigatórios.

export type FormType = 'quote' | 'supplier'

type Field = {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  options?: string[]
  /** Ocupa as duas colunas da grade. */
  wide?: boolean
  placeholder?: string
}

// Campos herdados dos formulários "Become a client" e "Become a supplier" do
// site antigo (ver tradução para o espanhol), reorganizados por relevância.
const common: Field[] = [
  { name: 'firstName', label: 'First name', required: true },
  { name: 'lastName', label: 'Last name' },
  { name: 'company', label: 'Company', required: true },
  { name: 'country', label: 'Country', required: true },
  { name: 'email', label: 'Business email', type: 'email', required: true },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel' },
]

export const formFields: Record<FormType, Field[]> = {
  quote: [
    ...common,
    { name: 'businessType', label: 'Type of business', type: 'select', options: ['Industry', 'Distributor', 'Other'] },
    { name: 'product', label: 'Product of interest', required: true },
    { name: 'specification', label: 'Technical specification / CAS No.' },
    { name: 'endUse', label: 'End use' },
    { name: 'annualVolume', label: 'Estimated annual volume', placeholder: 'e.g. 1,200 metric tons' },
    { name: 'preferredContact', label: 'Preferred contact', type: 'select', options: ['Email', 'Phone call', 'WhatsApp', 'Any'] },
    { name: 'message', label: 'Additional information', type: 'textarea', wide: true },
  ],
  supplier: [
    ...common,
    { name: 'businessType', label: 'Type of business', type: 'select', options: ['Manufacturer', 'Trader', 'Other'] },
    { name: 'product', label: 'Products you supply', required: true },
    { name: 'specification', label: 'CAS No. / technical specification' },
    { name: 'capacity', label: 'Monthly or annual capacity' },
    { name: 'certifications', label: 'Certifications', placeholder: 'e.g. ISO 9001, REACH' },
    { name: 'message', label: 'Tell us about your company', type: 'textarea', wide: true },
  ],
}
