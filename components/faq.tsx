'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PhoneLink } from '@/components/phone-link'
import { site } from '@/lib/site'

type FaqItem =
  | { id: string; question: string; paragraphs: readonly string[] }
  | {
      id: 'services-offered'
      question: string
      intro: string
      bullets: readonly string[]
    }
  | { id: 'book'; question: string }

const faqItems: readonly FaqItem[] = [
  {
    id: 'areas-served',
    question: 'What areas do you serve?',
    paragraphs: [
      'We proudly provide mobile dog grooming services throughout Sarasota, Bradenton, Venice, Lakewood Ranch, Osprey, Nokomis, Parrish, and surrounding areas. If you are outside our primary service area, feel free to contact us to check availability.',
    ],
  },
  {
    id: 'how-mobile-works',
    question: 'How does mobile dog grooming work?',
    paragraphs: [
      'Our fully equipped mobile grooming van comes directly to your home. We perform the grooming service right outside your house, so your pet can enjoy a stress-free experience without traveling to a salon.',
    ],
  },
  {
    id: 'services-offered',
    question: 'What services do you offer?',
    intro: 'We offer a complete range of dog grooming services including:',
    bullets: [
      'Full grooming',
      'Bath & brush',
      'Nail trimming',
      'Ear cleaning',
      'De-shedding treatments',
      'Puppy grooming',
      'Senior dog grooming',
      'Flea & tick baths',
    ],
  },
  {
    id: 'appointment-length',
    question: 'How long does a grooming appointment take?',
    paragraphs: [
      'Appointment times vary depending on your dog’s breed, size, coat condition, and the services requested. Most appointments typically take between 1 to 3 hours.',
    ],
  },
  {
    id: 'all-breeds',
    question: 'Do you groom all dog breeds?',
    paragraphs: ['Yes! We work with dogs of all breeds, sizes, and coat types.'],
  },
  {
    id: 'large-dogs',
    question: 'Do you groom large dogs?',
    paragraphs: ['Absolutely. We groom small, medium, large, and extra-large dogs.'],
  },
  {
    id: 'less-stressful',
    question: 'Is mobile grooming less stressful for dogs?',
    paragraphs: [
      'Yes. Mobile grooming helps reduce anxiety because your dog stays in a familiar environment without car rides, cages, or crowded salons.',
    ],
  },
  {
    id: 'before-appointment',
    question: 'What should I do before the appointment?',
    paragraphs: [
      'Please make sure your dog has had a chance to use the bathroom before the appointment. We also recommend providing a safe and accessible parking area for the grooming van.',
    ],
  },
  {
    id: 'water-electricity',
    question: 'Do I need to provide water or electricity?',
    paragraphs: ['No. Our mobile grooming van is fully self-contained and equipped with its own water and power supply.'],
  },
  {
    id: 'how-often-groom',
    question: 'How often should my dog be groomed?',
    paragraphs: [
      'Most dogs benefit from grooming every 4 to 8 weeks, depending on breed, coat type, and lifestyle.',
    ],
  },
  {
    id: 'products-used',
    question: 'What products do you use?',
    paragraphs: [
      'We use high-quality professional shampoos and grooming products designed to keep your dog’s coat healthy, clean, and soft.',
    ],
  },
  {
    id: 'anxiety-special-needs',
    question: 'Can you handle dogs with anxiety or special needs?',
    paragraphs: [
      'Yes. We provide personalized care and extra patience for anxious dogs, puppies, and senior dogs with mobility or special needs.',
    ],
  },
  {
    id: 'flea-tick',
    question: 'Do you offer flea and tick treatments?',
    paragraphs: [
      'Yes. We offer flea and tick baths designed to help eliminate pests and improve your dog’s comfort.',
    ],
  },
  {
    id: 'pricing',
    question: 'How much does grooming cost?',
    paragraphs: [
      'Pricing depends on your dog’s breed, size, coat condition, and the services requested. Contact us for a personalized quote.',
    ],
  },
  { id: 'book', question: 'How can I book an appointment?' },
  {
    id: 'payment-methods',
    question: 'What payment methods do you accept?',
    paragraphs: ['We accept most major payment methods. Contact us if you have questions regarding payment options.'],
  },
  {
    id: 'cancel-reschedule',
    question: 'What happens if I need to cancel or reschedule?',
    paragraphs: ['We understand that plans change. Please contact us as soon as possible if you need to cancel or reschedule your appointment.'],
  },
  {
    id: 'sanitized',
    question: 'Are your grooming tools sanitized?',
    paragraphs: [
      'Yes. We sanitize our grooming equipment and mobile van between appointments to maintain a clean and safe environment for every pet.',
    ],
  },
  {
    id: 'stay-with-dog',
    question: 'Can I stay with my dog during the grooming appointment?',
    paragraphs: [
      'For safety and to help dogs stay calm, we generally recommend allowing the groomer to work independently. However, we’re happy to discuss special situations if needed.',
    ],
  },
  {
    id: 'cats',
    question: 'Do you groom cats?',
    paragraphs: ['Currently, our primary focus is dog grooming services. Contact us directly for any special requests.'],
  },
  {
    id: 'why-amg',
    question: 'Why choose AMG Mobile Grooming?',
    paragraphs: [
      'AMG Mobile Grooming offers professional, stress-free, and convenient pet grooming services right at your doorstep. We focus on personalized care, cleanliness, safety, and making every grooming experience comfortable for your furry friend.',
    ],
  },
]

function FaqAnswerBody({ item }: { item: FaqItem }) {
  if (item.id === 'services-offered') {
    return (
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        <p>{item.intro}</p>
        <ul className="ml-5 list-disc space-y-1.5">
          {item.bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    )
  }

  if (item.id === 'book') {
    return (
      <p className="text-muted-foreground leading-relaxed">
        {'You can call us directly at '}
        <PhoneLink
          href={`tel:${site.phoneTel}`}
          className="font-medium text-primary underline-offset-4 hover:text-accent hover:underline"
        >
          {site.phoneDisplay}
        </PhoneLink>
        {' or fill out the '}
        <a href="/#quote" className="font-medium text-primary underline-offset-4 hover:text-accent hover:underline">
          request form
        </a>
        {' on our website.'}
      </p>
    )
  }

  return (
    <div className="space-y-3 text-muted-foreground leading-relaxed">
      {item.paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  )
}

export function Faq() {
  return (
    <section id="faq" className="surface-band-light border-t border-accent/25 py-16 sm:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="px-5 py-10 sm:px-8">
          <div className="text-center">
            <h2 id="faq-heading" className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Quick answers about mobile grooming with {site.name}.</p>
          </div>

          <Accordion type="single" collapsible className="mt-10 w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-border/70">
                <AccordionTrigger className="font-heading text-left text-[0.9375rem] font-semibold text-foreground hover:no-underline sm:text-base [&[data-state=open]]:text-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <FaqAnswerBody item={item} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
