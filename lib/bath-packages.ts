export type WeightPriceRow = {
  weight: string
  price: string
}

export type BathPackage = {
  id: string
  title: string
  subtitle?: string
  description: string
  includes: readonly string[]
  pricing: readonly WeightPriceRow[]
}

export type AddOnService = {
  id: string
  title: string
  description: string
  price: string
}

export const bathPackages: readonly BathPackage[] = [
  {
    id: 'doodles-bichon',
    title: 'Doodle & Bichon Premium Bath Package',
    description:
      'Doodles and Bichons have special coat types that require extra care and attention, resulting in longer and more detailed grooming sessions to keep their coat healthy, soft, and tangle-free.',
    includes: [
      'Hydra Premium shampoo & conditioner bath',
      'Nail trimming',
      'Ear cleaning',
      'Full brushing',
      'Blow dry finish',
      'External anal gland expression available upon request',
    ],
    pricing: [
      { weight: '0 – 20 lbs', price: '$95' },
      { weight: '21 – 40 lbs', price: '$115' },
      { weight: '41 – 60 lbs', price: '$135' },
      { weight: '61 – 80 lbs', price: '$155' },
      { weight: '81 – 100 lbs', price: '$175' },
      { weight: '101+ lbs', price: '$195' },
    ],
  },
  {
    id: 'short-hair',
    title: 'Short Hair Bath Package',
    description:
      'Perfect for short-haired pets that need a refreshing bath and deep cleaning to keep their skin and coat healthy and clean.',
    includes: [
      'Ear cleaning',
      'Facial wash',
      "Customized shampoo based on your pet's coat condition",
      'Conditioner treatment',
      'Blow dry',
      'Full brushing',
      'External anal gland expression available upon request',
    ],
    pricing: [
      { weight: '1 – 20 lbs', price: '$85' },
      { weight: '21 – 40 lbs', price: '$100' },
      { weight: '41 – 60 lbs', price: '$120' },
      { weight: '61 – 80 lbs', price: '$140' },
      { weight: '81 – 100 lbs', price: '$160' },
      { weight: '101+ lbs', price: '$180' },
    ],
  },
] as const

export const addOnServices: readonly AddOnService[] = [
  {
    id: 'deshedding',
    title: 'Deshedding Treatment',
    description:
      'This service is an add-on to any bath package and is highly recommended for double-coated breeds every 4–6 weeks to help reduce excessive shedding.',
    price: '$30',
  },
  {
    id: 'paw-nose-cream',
    title: 'Paw & Nose Cream Treatment',
    description:
      "This moisturizing treatment helps prevent dryness and cracking while promoting healing on your dog's most sensitive areas, including paws and nose. Especially important in the Florida heat.",
    price: '$10',
  },
] as const
