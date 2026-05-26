import Link from 'next/link'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addOnServices, bathPackages, type BathPackage } from '@/lib/bath-packages'
import { site } from '@/lib/site'

function PackagePricingTable({ rows }: { rows: BathPackage['pricing'] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/80 bg-background/40">
      <Table>
        <TableHeader>
          <TableRow className="border-border/80 hover:bg-transparent">
            <TableHead className="h-11 bg-muted/40 px-4 text-xs font-semibold uppercase tracking-wide text-foreground sm:text-sm">
              Weight
            </TableHead>
            <TableHead className="h-11 bg-muted/40 px-4 text-right text-xs font-semibold uppercase tracking-wide text-foreground sm:text-sm">
              Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.weight} className="border-border/60">
              <TableCell className="px-4 py-3 font-medium text-foreground">{row.weight}</TableCell>
              <TableCell className="px-4 py-3 text-right font-heading text-lg font-bold text-accent">
                {row.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function BathPackageCard({ pkg }: { pkg: BathPackage }) {
  return (
    <article
      id={pkg.id}
      className="scroll-mt-28 rounded-2xl border border-border/70 bg-card/80 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
    >
      <CardHeader className="border-b border-border/60 pb-6">
        <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-[1.625rem]">
          {pkg.title}
        </CardTitle>
        <p className="mt-3 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground">
          {pkg.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-8 pt-6">
        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">Includes</h3>
          <ul className="mt-4 space-y-2.5">
            {pkg.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">Pricing</h3>
          <div className="mt-4">
            <PackagePricingTable rows={pkg.pricing} />
          </div>
        </div>
      </CardContent>
    </article>
  )
}

export function BathPackages() {
  return (
    <section
      id="bath-packages"
      className="surface-band-light border-t border-accent/25 py-16 sm:py-24"
      aria-labelledby="bath-packages-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="px-5 py-10 sm:px-8">
          <div className="text-center">
            <h1
              id="bath-packages-heading"
              className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Grooming Bath Packages
            </h1>
            <div
              className="mx-auto mt-4 h-1.5 w-16 shrink-0 rounded-full bg-accent shadow-[0_0_22px_-4px_oklch(0.76_0.17_82_/_0.55)] sm:w-20"
              aria-hidden
            />
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              Premium mobile bath packages for every coat type — transparent pricing by weight. Serving{' '}
              {site.serviceArea}.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {bathPackages.map((pkg) => (
              <BathPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          <div className="mt-16">
            <div className="flex items-center justify-center gap-2 text-center">
              <Sparkles className="size-5 text-accent" aria-hidden />
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Add-On Services
              </h2>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {addOnServices.map((addon) => (
                <Card
                  key={addon.id}
                  className="border-border/70 bg-card/80 py-5 shadow-sm ring-1 ring-white/5"
                >
                  <CardHeader className="px-5 pb-0">
                    <CardTitle className="font-heading text-lg font-bold text-foreground">{addon.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pt-3">
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{addon.description}</p>
                    <p className="mt-4 font-heading text-xl font-bold text-accent">
                      <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Price: </span>
                      {addon.price}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <p className="max-w-lg text-pretty text-muted-foreground">
              Ready to book? Tell us your dog&apos;s weight and package — we&apos;ll confirm availability at your home.
            </p>
            <Button variant="gold" size="lg" className="shadow-md" asChild>
              <Link href="/#quote">Request Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
