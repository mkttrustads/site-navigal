import Image from 'next/image'
import Link from 'next/link'
import { company, primaryNav } from '@/content/site'
import { industries } from '@/content/industries'

/**
 * Estrutura do rodapé do site Trust Group (marca à esquerda, colunas de links
 * à direita, barra de copyright), em fundo claro e com a assinatura
 * "A Trust Group company".
 */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-linha bg-white text-preto">
      <div className="mx-auto max-w-site px-6 py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-sm flex-col gap-6">
            <Link href="/" aria-label="Navigal home">
              <Image
                src="/brand/navigal-logo.png"
                alt="Navigal Trading Solutions Limited"
                width={809}
                height={520}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-pretty text-base leading-relaxed text-suave">
              A global trading platform that structures international supply chains and delivers strategic raw materials
              to Latin American industry.
            </p>
            <a
              href="https://trust.group"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-semibold text-suave transition hover:text-cobalto"
            >
              A company of
              <Image
                src="/brand/trust-group-horizontal.png"
                alt="Trust Group"
                width={1134}
                height={294}
                className="h-7 w-auto"
              />
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:gap-16">
            <div>
              <h3 className="eyebrow mb-5 text-cobalto">Navigal</h3>
              <ul className="space-y-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-base text-preto/80 transition hover:text-cobalto">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-5 text-cobalto">Industries</h3>
              <ul className="space-y-3">
                {industries.slice(0, 6).map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/products?industry=${industry.slug}`}
                      className="text-base text-preto/80 transition hover:text-cobalto"
                    >
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-5 text-cobalto">Contact</h3>
              <ul className="space-y-3 text-base text-preto/80">
                <li>
                  <a href={`mailto:${company.email}`} className="break-words transition hover:text-cobalto">
                    {company.email}
                  </a>
                </li>
                {company.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className="transition hover:text-cobalto">
                      {phone.display}
                    </a>
                  </li>
                ))}
                <li className="pt-2 text-sm leading-relaxed text-suave">
                  {company.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-linha">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-6 py-6 text-sm text-suave sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p className="tracking-[0.14em]">TRADING SOLUTIONS LIMITED</p>
        </div>
      </div>
    </footer>
  )
}
