import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(941) 555-1234',
    href: 'tel:+19415551234',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@pawsandshine.com',
    href: 'mailto:hello@pawsandshine.com',
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'Sarasota & Manatee County',
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
    <section id="contact" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Ready to book an appointment or have questions? {"We'd"} love to hear from you!
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactInfo.map((item) => (
                <Card key={item.label} className="bg-secondary">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="size-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-foreground hover:text-primary"
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

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <a
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          {/* CTA Card */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center lg:p-12">
              <Phone className="mb-4 size-12" />
              <h3 className="text-2xl font-bold">Ready to Book?</h3>
              <p className="mt-2 text-primary-foreground/80">
                Call us now or request a quote online. {"We'll"} get your pup looking their best!
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <a href="tel:+19415551234">
                    <Phone className="size-5" />
                    Call (941) 555-1234
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <a href="#quote">Request Quote</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
