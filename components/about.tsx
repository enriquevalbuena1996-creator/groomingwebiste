import Image from 'next/image'
import { Heart, Shield, Clock, Star } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Personalized Care',
    description: 'Every dog gets individual attention and care tailored to their specific needs and temperament.',
  },
  {
    icon: Shield,
    title: 'Safe & Clean',
    description: 'Our mobile grooming van is sanitized between each appointment for maximum hygiene and safety.',
  },
  {
    icon: Clock,
    title: 'Convenient',
    description: 'No travel stress for your pet. We come to you at a time that works for your schedule.',
  },
  {
    icon: Star,
    title: 'Professional',
    description: 'Our certified groomers have years of experience handling dogs of all breeds and sizes.',
  },
]

export function About() {
  return (
    <section id="about" className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/about-grooming.jpg"
                alt="Professional groomer caring for a dog"
                width={600}
                height={500}
                className="aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Paws & Shine?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {"We're"} a mobile dog grooming company dedicated to providing stress-free, 
              high-quality grooming services right at your doorstep. We understand that 
              every dog is unique, which is why we focus on comfort, convenience, safety, 
              and personalized care for every furry client.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
