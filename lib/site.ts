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
  /** Alfonso's Mobile pet grooming — Facebook profile URL */
  facebookUrl:
    'https://www.facebook.com/people/Alfonsos-Mobile-pet-grooming/100064601895560/?mibextid=wwXIfr&rdid=ke7yrOHlqaf1ZR5M&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18qdpVRQmK%2F%3Fmibextid%3DwwXIfr',

  /** Sarasota mobile grooming listing on Thumbtack (reviews and hire metrics) */
  thumbtack: {
    profileUrl:
      'https://www.thumbtack.com/fl/sarasota/mobile-dog-grooming/alfonsos-mobile-grooming/service/245822262608684131',
    headlineLabel: 'Exceptional',
    averageRating: 5,
    reviewCount: 197,
  },

  /** Yelp — logo en `public/logoyelp2.webp` (ideal: burst en color sobre fondo transparente; si hay halo blanco, ver `mix-blend-multiply` en Contact/Footer). */
  yelpUrl: 'https://www.yelp.com/biz/alfonsos-mobile-grooming-sarasota',
  yelpLogoSrc: '/logoyelp2.webp',
  /** Portada: archivo en `public/` (nombre largo de Firefly export) */
  heroVideoSrc:
    '/Firefly Create a cinematic close-up video of a small curly brown toy poodle sitting calmly in a prof.mp4',
  /** Video poster + default social preview image (file must exist in `public/`) */
  heroPosterSrc: '/esta.jpg',
  /** Logo PNG sin fondo (`public/logo-removebg-preview.png`) */
  logoSrc: '/logo-removebg-preview.png',
} as const
