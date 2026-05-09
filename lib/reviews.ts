/** Google Business profile/search — aggregate rating snippet for footer CTA */
export const googleReviewsSummary = {
  averageRating: 4.9,
  reviewCount: 94,
  searchUrl:
    'https://www.google.com/search?sca_esv=55117bfb786c3fb6&rlz=1C1VDKB_enUS1188US1188&sxsrf=ANbL-n6WrDur37VQVzUXM7SfGvhN-6X52w:1778339590409&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOdoHGxtAhOsUuctIB0_HG5YqIwlil9fXDOIWqvNw8uUtZ5xN5AYNG3cMd-jqSF1qh3yxapsiQK2GnUVXfjNMoX506xKcCNsJZGr3e1O_wv9JjXo89g%3D%3D&q=ALFONSO%E2%80%99S+DOG+MOBILE+GROOMING+Reviews&sa=X&ved=2ahUKEwjj7c2cv6yUAxW4TDABHeqUHaMQ0bkNegQIQxAH&biw=2560&bih=1271&dpr=1',
}

export type CustomerReview = {
  id: string
  name: string
  /** Short line under the name (e.g. Local Guide) */
  subtitle?: string
  body: string
  rating: number
  /** Path under `public/` or null/omit for initials-only avatar */
  imageSrc?: string | null
  /** Optional photos shown under the review text (paths under `public/`) */
  attachedPhotos?: string[]
  /** Highlight tag like Google Maps (e.g. “Reasonable price”) */
  highlight?: string
}

export const customerReviews: CustomerReview[] = [
  {
    id: 'elizabeth-daley',
    name: 'Elizabeth Daley',
    subtitle: 'Local Guide · Google review',
    rating: 5,
    imageSrc: '/elizabeth.png',
    body:
      "Alfonso and his wife make a great team. They responded right away to my inquiries and made the entire process so easy and comfortable for myself and my husband. Our 2 mini schnauzers, Elvis & Ruby, look amazing!",
  },
  {
    id: 'jose-rodriguez',
    name: 'Jose Rodriguez',
    subtitle: 'Local Guide · Google review',
    rating: 5,
    imageSrc: '/joserodriguez.png',
    attachedPhotos: ['/joserodriguez1.webp', '/joserodriguez2.webp', '/joserodriguez3.webp'],
    body:
      "Our little Fluffy baby is a handful 🙄 Having a groomer come to us is amazing because she's young and gets carsick. Alfonso and his wife are amazing and fun people. He is also a dog handler—very knowledgeable on breeds and has an in-depth understanding.",
  },
  {
    id: 'natalia-lattanzio',
    name: 'Natalia Lattanzio',
    subtitle: 'Local Guide · 14 reviews · Google',
    rating: 5,
    highlight: 'Reasonable price',
    imageSrc: '/natalia.png',
    body:
      "I have two anxious dogs: one tends to get aggressive during distress, and the other hates loud noises. Alfonso took care of both and gave them excellent haircuts. I don't trust just anyone with my dogs—but from the moment we spoke, Alfonso earned our trust.",
  },
  {
    id: 'rachel-hourigan-lewis',
    name: 'Rachel Hourigan Lewis',
    subtitle: '11 reviews · 1 photo · Google',
    rating: 5,
    imageSrc: '/rachel.png',
    body:
      "I found Alfonso online. He and his wife are a great team. Our dogs don't get groomed that much, and he worked well with them—they were sparkling—and even ran up to him after the service. Highly recommend.",
  },
  {
    id: 'tiffany-weisert',
    name: 'Tiffany Weisert',
    subtitle: '5 reviews · Google',
    rating: 5,
    highlight: 'Reasonable price',
    imageSrc: '/tiffany.png',
    body:
      "Excellent dog groomer! Alfonso was able to handle my 3 high energy dogs and make them look and smell great! I have border collies and Aussies and having the convenience of coming to my home was a real plus. Highly recommend!",
  },
  {
    id: 'bobbi-robelen',
    name: 'Bobbi Robelen',
    subtitle: '14 reviews · 1 photo · Google',
    rating: 5,
    highlight: 'Reasonable price',
    imageSrc: '/bobbi.png',
    body:
      "Alfonso has been grooming our 7-year-old Havanese, Bentley, for over two years now. We have never been happier with a groomer—he's so talented and takes such pride in his work. Our little guy is not an easy one to groom!",
  },
  {
    id: 'giselle-medina',
    name: 'Giselle Medina',
    subtitle: '11 reviews · Google',
    rating: 5,
    imageSrc: '/giselle.png',
    body:
      "My family was delighted with Alfonso and Yaneth's professionalism and dedication to our Coco; it turned out beautifully! Thank you so much for your passion for what you do!",
  },
]
