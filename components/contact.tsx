import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, MapPin, Navigation, Clock, Facebook, Instagram, BadgeCheck } from 'lucide-react'
import { site } from '@/lib/site'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: site.phoneDisplay,
    href: `tel:${site.phoneTel}`,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: site.addressLine,
    href: site.mapsUrl,
  },
  {
    icon: Navigation,
    label: 'Service Area',
    value: site.serviceArea,
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Sat: 8am - 6pm',
    href: null,
  },
]

export function Contact() {
  return (
    <section id="contact" className="border-t border-accent/25 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="px-5 py-10 sm:px-8 sm:py-12">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Ready to book an appointment or have questions? {"We'd"} love to hear from you!
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <Card key={item.label} className="border-2 border-accent/45 bg-card/90 shadow-sm">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-md ring-2 ring-accent/35">
                        <item.icon className="size-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            {...(item.href.startsWith('http')
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className="font-medium text-foreground hover:text-accent"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground">{item.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-muted-foreground">Follow us:</span>
                <a
                  href={site.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border-2 border-accent/60 bg-accent/20 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="Facebook"
                >
                  <Facebook className="size-5" />
                </a>
                <a
                  href={site.thumbtack.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border-2 border-accent/60 bg-accent/20 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="Thumbtack — reviews and verified profile"
                >
                  <BadgeCheck className="size-5" />
                </a>
                <a
                  href={site.yelpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border-2 border-accent/60 bg-accent/20 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="Read reviews on Yelp (opens in a new tab)"
                >
                  <Image
                    src={site.yelpLogoSrc}
                    alt=""
                    width={128}
                    height={128}
                    className="h-7 w-7 object-contain brightness-125 saturate-150 contrast-105 drop-shadow-[0_0_10px_rgba(251,82,82,0.55)] sm:h-8 sm:w-8"
                    aria-hidden
                  />
                </a>
                <a
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full border-2 border-accent/60 bg-accent/20 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="size-5" />
                </a>
              </div>
            </div>

            <Card className="overflow-hidden border-2 border-[#9a7b18] bg-gradient-to-b from-[#f3e8b8] from-[8%] via-[#d4af37] via-45% to-[#a88415] to-[98%] shadow-[0_14px_44px_-10px_rgba(212,175,55,0.55)] ring-1 ring-[#f5e7a5]/40">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center lg:p-12">
                <Phone className="mb-4 size-12 text-brand-navy" aria-hidden />
                <h3 className="font-heading text-2xl font-semibold text-brand-navy">Ready to Book?</h3>
                <p className="mt-2 max-w-md text-pretty text-base text-brand-navy/85">
                  Call us now or request a quote online. {"We'll"} get your pup looking their best!
                </p>
                <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-brand-navy font-semibold text-white shadow-[0_6px_20px_rgba(6,21,40,0.45)] hover:bg-brand-navy/92 [&_svg]:text-white"
                  >
                    <a href={`tel:${site.phoneTel}`}>
                      <Phone className="size-5" />
                      Call {site.phoneDisplay}
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="bg-brand-navy font-semibold text-white shadow-[0_6px_20px_rgba(6,21,40,0.45)] hover:bg-brand-navy/92"
                  >
                    <a href="#quote">Request Quote</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
