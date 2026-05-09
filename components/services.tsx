import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Scissors, Bath, HandMetal, Ear, Wind, Dog, Heart, Bug } from 'lucide-react'

const services = [
  {
    icon: Scissors,
    title: 'Full Grooming',
    description: 'Complete grooming package including bath, haircut, nail trim, ear cleaning, and styling tailored to your dog\'s breed.',
  },
  {
    icon: Bath,
    title: 'Bath & Brush',
    description: 'Thorough bathing with premium shampoo and conditioner, followed by a complete brush-out and blow-dry.',
  },
  {
    icon: HandMetal,
    title: 'Nail Trimming',
    description: 'Safe and gentle nail trimming to keep your dog comfortable and prevent scratches or overgrowth.',
  },
  {
    icon: Ear,
    title: 'Ear Cleaning',
    description: 'Careful ear cleaning to remove debris and prevent infections, keeping your dog healthy and happy.',
  },
  {
    icon: Wind,
    title: 'De-shedding Treatment',
    description: 'Specialized treatment to reduce shedding and keep your home fur-free. Perfect for heavy shedders.',
  },
  {
    icon: Dog,
    title: 'Puppy Grooming',
    description: 'Gentle introduction to grooming for puppies. We make their first experience positive and stress-free.',
  },
  {
    icon: Heart,
    title: 'Senior Dog Grooming',
    description: 'Extra patience and care for our older friends. We accommodate mobility issues and special needs.',
  },
  {
    icon: Bug,
    title: 'Flea & Tick Bath',
    description: 'Medicated bath to eliminate fleas and ticks, leaving your dog clean, healthy, and pest-free.',
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-accent/25 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-gold-frame px-5 py-10 sm:px-8 sm:py-12">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We offer a full range of professional grooming services to keep your furry friend looking and feeling their
              best.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card
                key={service.title}
                className="group border-2 border-accent/45 bg-card/90 shadow-md transition-all hover:border-accent hover:shadow-[0_0_28px_-6px_oklch(0.76_0.17_82_/_0.45)]"
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-inner ring-2 ring-accent/40 transition-colors">
                    <service.icon className="size-6" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
