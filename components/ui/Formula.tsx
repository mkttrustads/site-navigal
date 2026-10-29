import { Fragment } from 'react'

/** Fórmula molecular com os índices em subscrito (ex.: C6H8O7, (C3H5NO)n). */
export default function Formula({ value }: { value: string }) {
  const parts = value.split(/(\d+|n$)/).filter(Boolean)
  return (
    <span className="stat-numeral">
      {parts.map((part, index) => {
        const previous = parts[index - 1]
        const isIndex = /^(\d+|n)$/.test(part) && previous !== undefined && /[A-Za-z)]$/.test(previous)
        return isIndex ? <sub key={index}>{part}</sub> : <Fragment key={index}>{part}</Fragment>
      })}
    </span>
  )
}
