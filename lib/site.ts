/** Business / site identity — single source of truth */
export const site = {
  name: "ALFONSO'S DOG MOBILE GROOMING",
  /** Header logo lines (mobile-friendly) */
  nameLines: ["ALFONSO'S DOG", "MOBILE GROOMING"] as const,
  phoneDisplay: '(941) 402-9395',
  phoneTel: '+19414029395',
  addressLine: 'Glen Ridge Ln, Sarasota, FL 34232',
  serviceArea: 'Sarasota & Manatee County',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Glen Ridge Ln, Sarasota, FL 34232'),
  /** Portada: archivo en `public/` (nombre largo de Firefly export) */
  heroVideoSrc:
    '/Firefly Create a cinematic close-up video of a small curly brown toy poodle sitting calmly in a prof.mp4',
  heroPosterSrc: '/images/hero-dog.jpg',
  /** Logo PNG sin fondo (`public/logo-removebg-preview.png`) */
  logoSrc: '/logo-removebg-preview.png',
} as const
