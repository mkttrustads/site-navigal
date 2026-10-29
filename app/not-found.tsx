import Button from '@/components/ui/Button'
import GlobeMark from '@/components/ui/GlobeMark'

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-preto text-white">
      <GlobeMark tone="dark" className="absolute -right-20 top-1/2 h-[120%] -translate-y-1/2 opacity-[0.08]" />
      <div className="relative mx-auto w-full max-w-site px-6 pt-24">
        <p className="eyebrow text-cobalto-claro">Error 404</p>
        <h1 className="mt-4 max-w-2xl text-[clamp(2.4rem,4.6vw,4rem)]">This route does not exist.</h1>
        <p className="mt-5 max-w-xl text-lg text-white/75">The page you are looking for may have moved. Let us take you back on course.</p>
        <Button href="/" arrow className="mt-10">
          Back to home
        </Button>
      </div>
    </section>
  )
}
