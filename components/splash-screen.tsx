'use client'

import Image from 'next/image'
import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '@/lib/site'

const STORAGE_KEY = 'amg-splash-seen-v1'
const DISPLAY_MS = 2000
const EXIT_MS = 400

type Phase = 'off' | 'on' | 'exit'

function readInitialPhase(): Phase {
  if (typeof window === 'undefined') return 'off'
  try {
    return localStorage.getItem(STORAGE_KEY) ? 'off' : 'on'
  } catch {
    return 'off'
  }
}

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>(readInitialPhase)

  useEffect(() => {
    if (phase !== 'on') return
    document.body.style.overflow = 'hidden'

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const showMs = prefersReduced ? 800 : DISPLAY_MS

    const t1 = window.setTimeout(() => setPhase('exit'), showMs)
    return () => {
      window.clearTimeout(t1)
      document.body.style.overflow = ''
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'exit') return
    const t2 = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ignore quota / private mode */
      }
      document.body.style.overflow = ''
      setPhase('off')
    }, EXIT_MS)
    return () => window.clearTimeout(t2)
  }, [phase])

  if (phase === 'off') return null

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-10 bg-brand-navy-deep px-6 transition-opacity duration-[400ms] ease-out ${
        phase === 'exit' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
        <Image
          src={site.logoSrc}
          alt=""
          width={220}
          height={103}
          className="h-auto w-[min(72vw,220px)] object-contain object-center"
          priority
        />
      </div>
      <Clock
        className="size-14 text-accent motion-safe:animate-spin sm:size-16"
        style={{ animationDuration: '2.5s' }}
        strokeWidth={2}
        aria-hidden
      />
    </div>
  )
}
