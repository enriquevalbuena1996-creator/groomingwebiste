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
    <section id="services" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We offer a full range of professional grooming services to keep your furry friend 
            looking and feeling their best.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="group transition-shadow hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="size-6 text-primary" />
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
    </section>
  )
}
