'use client'

import dynamic from 'next/dynamic'

const SplashScreen = dynamic(
  () => import('@/components/splash-screen').then((mod) => ({ default: mod.SplashScreen })),
  { ssr: false },
)

/** First-visit splash — loaded client-only so localStorage / timing behave correctly. */
export function SplashRoot() {
  return <SplashScreen />
}
