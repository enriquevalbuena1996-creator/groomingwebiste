'use client'

import Image from 'next/image'
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { customerReviews, googleReviewsSummary, type CustomerReview } from '@/lib/reviews'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** Renders five stars including at most one partial fill from `rating`. */
function OverallRatingStars({
  rating,
  className,
  starClassName = 'size-7 sm:size-8',
}: {
  rating: number
  className?: string
  starClassName?: string
}) {
  let remaining = Math.min(5, Math.max(0, rating))
  const items: ReactNode[] = []

  for (let i = 0; i < 5; i++) {
    if (remaining >= 1 - 1e-4) {
      items.push(<Star key={i} className={cn(starClassName, 'fill-accent text-accent')} aria-hidden />)
      remaining -= 1
    } else if (remaining > 1e-4) {
      const pct = Math.min(100, Math.round(remaining * 100))
      remaining = 0
      items.push(
        <span key={i} className={cn('relative shrink-0', starClassName)} aria-hidden>
          <Star className="pointer-events-none absolute inset-0 size-full fill-muted/35 text-muted" />
          <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
            <Star className="pointer-events-none size-full fill-accent text-accent" />
          </span>
        </span>,
      )
    } else {
      items.push(<Star key={i} className={cn(starClassName, 'fill-muted/35 text-muted')} aria-hidden />)
    }
  }

  return (
    <div className={cn('flex gap-1', className)} aria-hidden>
      {items}
    </div>
  )
}

function ReviewStars({ rating }: { rating: number }) {
  const safe = Math.min(5, Math.max(0, Math.round(rating)))
  return (
    <div className="flex gap-0.5" aria-label={`${safe} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn('size-4 shrink-0', i < safe ? 'fill-accent text-accent' : 'fill-muted text-muted')}
          aria-hidden
        />
      ))}
    </div>
  )
}

function ReviewAttachedPhotos({ photos, reviewerName }: { photos: string[]; reviewerName: string }) {
  if (photos.length === 0) return null

  return (
    <ul className="mt-4 grid list-none grid-cols-3 gap-2 p-0" aria-label={`Photos attached to Google review by ${reviewerName}`}>
      {photos.map((src, idx) => (
        <li key={src} className="relative aspect-square overflow-hidden rounded-lg ring-1 ring-border/70">
          <Image
            src={src}
            alt={`Photo ${idx + 1} from Google review — ${reviewerName}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 26vw, 120px"
          />
        </li>
      ))}
    </ul>
  )
}

function ReviewAvatar({ review }: { review: CustomerReview }) {
  const label = initialsFromName(review.name)

  if (review.imageSrc) {
    return (
      <span className="relative block size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40 ring-offset-2 ring-offset-card">
        <Image
          src={review.imageSrc}
          alt=""
          width={56}
          height={56}
          className="size-full object-cover"
          aria-hidden
        />
      </span>
    )
  }

  return (
    <span
      className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-semibold uppercase tracking-wide text-primary-foreground ring-2 ring-accent/40 ring-offset-2 ring-offset-card"
      aria-hidden
    >
      {label}
    </span>
  )
}

function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <article
      data-review-card
      className={cn(
        'w-[min(100vw-2rem,22rem)] shrink-0 rounded-xl border border-accent/35 bg-card p-5 shadow-lg',
        'shadow-[0_0_0_1px_oklch(0.76_0.17_82/0.12),inset_0_1px_0_oklch(0.92_0.12_82/0.08)]',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <ReviewAvatar review={review} />
        <div className="min-w-0 flex-1 pt-0.5 text-right">
          <ReviewStars rating={review.rating} />
        </div>
      </div>
      {review.highlight ? (
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-accent">{review.highlight}</p>
      ) : null}
      <p className="mt-4 line-clamp-[10] text-sm leading-relaxed text-muted-foreground">&ldquo;{review.body}&rdquo;</p>
      <ReviewAttachedPhotos photos={review.attachedPhotos ?? []} reviewerName={review.name} />
      <div className="mt-4 border-t border-border/60 pt-3">
        <p className="font-heading text-sm font-semibold text-foreground">{review.name}</p>
        {review.subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{review.subtitle}</p> : null}
      </div>
    </article>
  )
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return reduced
}

export function Reviews() {
  const reducedMotion = usePrefersReducedMotion()
  const trackDuped = [...customerReviews, ...customerReviews]
  const total = customerReviews.length
  /** Three copies — middle slice is canonical; snap when crossing outer copies for seamless infinite scroll */
  const tripleTrack = useMemo(
    () => [...customerReviews, ...customerReviews, ...customerReviews],
    [total],
  )

  const [manualMode, setManualMode] = useState(false)
  /** Slide index across `tripleTrack`; keep in [total, 2 * total - 1] once settled (shows full middle copy) */
  const [laneIndex, setLaneIndex] = useState(total)
  const [stepPx, setStepPx] = useState<number | null>(null)
  /** Disable transform transition while snapping to middle copy (looks identical → no flicker). */
  const [suspendTransition, setSuspendTransition] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const laneIndexRef = useRef(total)

  useEffect(() => {
    laneIndexRef.current = laneIndex
  }, [laneIndex])

  useLayoutEffect(() => {
    const root = carouselRef.current
    if (!root || reducedMotion) return

    function measureStep() {
      const card = root.querySelector('[data-review-card]') as HTMLElement | null
      const row = card?.parentElement as HTMLElement | null
      if (!card || !row) return

      const width = Math.round(card.getBoundingClientRect().width)
      const styles = window.getComputedStyle(row)
      const gapRaw = styles.columnGap || styles.gap || '24px'
      const gapParsed = Number.parseFloat(gapRaw)
      const gap = Number.isFinite(gapParsed) ? Math.round(gapParsed) : 24

      const nextStep = Math.max(width + gap, 1)
      setStepPx((prev) => (prev === nextStep ? prev : nextStep))
    }

    measureStep()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureStep) : null

    const row = root.querySelector('[data-review-card]')?.parentElement
    if (row instanceof HTMLElement) {
      ro?.observe(row)
    }

    window.addEventListener('resize', measureStep)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measureStep)
    }
  }, [manualMode, reducedMotion, total])

  function go(direction: -1 | 1) {
    if (total <= 1) {
      setManualMode(true)
      return
    }

    if (!manualMode) {
      setManualMode(true)
      const logicalTarget = direction > 0 ? 1 % total : (total - 1 + total) % total
      const targetLane = total + logicalTarget
      laneIndexRef.current = targetLane
      setLaneIndex(targetLane)
      return
    }

    setLaneIndex((prev) => {
      const next = prev + direction
      laneIndexRef.current = next
      return next
    })
  }

  function handleManualStripTransitionEnd(e: TransitionEvent<HTMLDivElement>) {
    if (!manualMode || suspendTransition || total <= 1) return
    if (e.propertyName !== 'transform') return

    const curr = laneIndexRef.current
    if (curr >= 2 * total) {
      const snapped = curr - total
      setSuspendTransition(true)
      laneIndexRef.current = snapped
      setLaneIndex(snapped)
    } else if (curr < total) {
      const snapped = curr + total
      setSuspendTransition(true)
      laneIndexRef.current = snapped
      setLaneIndex(snapped)
    } else {
      return
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSuspendTransition(false)
      })
    })
  }

  const manualLogicalIndex =
    total > 1 ? (((laneIndex - total) % total) + total) % total : 0

  return (
    <section id="reviews" className="border-t border-accent/25 bg-background py-16 sm:py-24" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-gold-frame px-5 py-10 sm:px-8">
          <div className="text-center">
            <h2 id="reviews-heading" className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Loved by Sarasota Pet Parents
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Real feedback from neighbors who booked mobile grooming.</p>
          </div>

          <div
            ref={carouselRef}
            id="reviews-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            className={cn('relative mt-10', reducedMotion ? 'px-2' : 'px-10 sm:px-14 lg:px-16')}
          >
            {!reducedMotion ? (
              <>
                <span
                  className="pointer-events-none absolute inset-y-2 left-0 z-10 hidden w-14 bg-gradient-to-r from-secondary to-transparent sm:block"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-y-2 right-0 z-10 hidden w-14 bg-gradient-to-l from-secondary to-transparent sm:block"
                  aria-hidden
                />

                {!reducedMotion && total > 1 ? (
                  <>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      aria-label={
                        manualMode ? 'Previous review' : 'Stop autoplay and go to previous review'
                      }
                      aria-controls="reviews-carousel"
                      className="absolute left-0 top-[42%] z-30 size-11 -translate-y-1/2 rounded-full border-accent/55 bg-brand-navy-elevated/95 text-accent shadow-lg backdrop-blur-sm hover:border-accent hover:bg-accent/15 sm:size-12"
                      onClick={() => go(-1)}
                    >
                      <ChevronLeft className="size-6 shrink-0" aria-hidden strokeWidth={2.25} />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      aria-label={manualMode ? 'Next review' : 'Stop autoplay and go to next review'}
                      aria-controls="reviews-carousel"
                      className="absolute right-0 top-[42%] z-30 size-11 -translate-y-1/2 rounded-full border-accent/55 bg-brand-navy-elevated/95 text-accent shadow-lg backdrop-blur-sm hover:border-accent hover:bg-accent/15 sm:size-12"
                      onClick={() => go(1)}
                    >
                      <ChevronRight className="size-6 shrink-0" aria-hidden strokeWidth={2.25} />
                    </Button>
                  </>
                ) : null}
              </>
            ) : null}

            {reducedMotion ? (
              <div className="flex flex-wrap justify-center gap-6">
                {customerReviews.map((r) => (
                  <ReviewCard key={`${r.id}-reduce`} review={r} />
                ))}
              </div>
            ) : manualMode ? (
              total <= 1 ? (
                <div className="relative flex justify-center py-2">
                  {customerReviews[0] ? <ReviewCard review={customerReviews[0]} /> : null}
                </div>
              ) : (
                <div className="relative overflow-hidden py-2">
                  <div className="sr-only" aria-live="polite">
                    Showing review {manualLogicalIndex + 1} of {total}. Navigation is manual.
                  </div>
                  <div
                    className={cn(
                      'flex gap-6 motion-reduce:transition-none',
                      suspendTransition ? 'transition-none' : 'transition-[transform] duration-300 ease-out',
                    )}
                    style={{
                      transform:
                        stepPx !== null ? `translate3d(-${laneIndex * stepPx}px, 0, 0)` : undefined,
                    }}
                    onTransitionEnd={handleManualStripTransitionEnd}
                  >
                    {tripleTrack.map((r, idx) => (
                      <ReviewCard key={`${r.id}-loop-${idx}`} review={r} />
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="overflow-hidden py-2">
                <div className="reviews-marquee-track flex gap-6" aria-label="Automatically scrolling testimonials">
                  {trackDuped.map((r, i) => (
                    <ReviewCard key={`${r.id}-${i}`} review={r} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 border-t border-accent/25 pt-10">
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col items-center gap-4 text-center md:items-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Google Reviews
                </p>
                <div
                  className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6"
                  role="img"
                  aria-label={`${googleReviewsSummary.averageRating} stars average rating from ${googleReviewsSummary.reviewCount} reviews on Google`}
                >
                  <OverallRatingStars rating={googleReviewsSummary.averageRating} />
                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                    <span className="font-heading text-3xl font-bold tabular-nums text-accent sm:text-4xl">
                      {googleReviewsSummary.averageRating.toFixed(1)}
                    </span>
                    <span className="hidden h-10 w-px bg-border sm:block" aria-hidden />
                    <span className="max-w-[16rem] text-pretty text-sm leading-snug text-muted-foreground sm:max-w-none sm:text-base">
                      Based on{' '}
                      <span className="font-semibold text-foreground">{googleReviewsSummary.reviewCount}</span>{' '}
                      reviews on Google
                    </span>
                  </div>
                </div>
                <a
                  href={googleReviewsSummary.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-base font-semibold text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  See all reviews on Google
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>

              <div className="flex flex-col items-center gap-4 border-t border-accent/20 pt-10 text-center md:border-t-0 md:border-l md:pt-0 md:pl-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Thumbtack</p>
                <div
                  className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6"
                  role="img"
                  aria-label={`${site.thumbtack.headlineLabel} ${site.thumbtack.averageRating} stars from ${site.thumbtack.reviewCount} reviews on Thumbtack`}
                >
                  <OverallRatingStars rating={site.thumbtack.averageRating} />
                  <div className="flex max-w-xl flex-col items-center gap-1 sm:items-start">
                    <span className="rounded-full bg-emerald-400/18 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                      {site.thumbtack.headlineLabel} {site.thumbtack.averageRating.toFixed(1)}
                    </span>
                    <span className="text-pretty text-sm leading-snug text-muted-foreground sm:text-base">
                      <span className="font-semibold text-foreground">{site.thumbtack.reviewCount}</span> reviews · Hired{' '}
                      204+ times · Top Pro · 26 years in business
                    </span>
                  </div>
                </div>
                <p className="max-w-md text-sm text-muted-foreground">
                  See Alfonso&apos;s verified profile on Thumbtack for more customer reviews and to request pricing.
                </p>
                <a
                  href={site.thumbtack.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-base font-semibold text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Open Thumbtack profile
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
