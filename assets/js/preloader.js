// ============================================================
// preloader.js — Logo split-reveal → grow-into-banner intro
// Matches Figma node 5:79's three keyframes: full logo, then the wordmark
// split with a small 218×137 photo in the gap, then that photo filling the
// full 1440×900 frame as the hero banner.
// Runs once on initial load, then hands off to the hero section.
// ============================================================

export default function initPreloader() {
  const preloader = document.querySelector('[data-preloader]')
  if (!preloader) return

  const logo = preloader.querySelector('[data-preloader-logo]')
  const splitWrap = preloader.querySelector('[data-preloader-split-wrap]')
  const splitLeft = preloader.querySelector('.preloader-section__split--left')
  const splitRight = preloader.querySelector('.preloader-section__split--right')
  const reveal = preloader.querySelector('[data-preloader-reveal]')
  const heroCopy = document.querySelector('.hero-section__copy')
  const heroCtas = document.querySelector('.hero-section__ctas')

  const finish = () => {
    preloader.style.display = 'none'
    preloader.setAttribute('aria-hidden', 'true')
    window.siteLenis?.start()
  }

  window.siteLenis?.stop()

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!window.gsap || prefersReducedMotion) {
    finish()
    return
  }

  const gsap = window.gsap
  const failSafe = setTimeout(finish, 7000)

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    onComplete: () => {
      clearTimeout(failSafe)
      finish()
    },
  })

  // Figma node 5:85 — the gap photo is 218×137 before it grows to fullscreen.
  const WINDOW_W = 218
  const WINDOW_H = 137

  gsap.set(reveal, { width: WINDOW_W, height: WINDOW_H, opacity: 0 })
  if (heroCopy) gsap.set(heroCopy.children, { opacity: 0, y: 24 })
  if (heroCtas) gsap.set(heroCtas.children, { opacity: 0, y: 24 })

  // 1. Logo fades in whole first (Figma keyframe 1)
  tl.from(logo, { opacity: 0, y: 16, duration: 0.7 }).to({}, { duration: 0.35 })

  // 2. Wordmark splits apart and the photo appears in the gap (Figma keyframe 2)
  // The wordmark's own blank gap is already 28px (488 - 189 - 271); each
  // half only needs to travel half of the remaining distance to clear room
  // for the 218px photo window.
  const NATURAL_GAP = 28
  const SPREAD = (WINDOW_W - NATURAL_GAP) / 2

  tl.to(logo, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 'split')
    .set(splitWrap, { opacity: 1 }, 'split')
    .fromTo(splitLeft, { x: 0 }, { x: -SPREAD, duration: 0.8, ease: 'power3.inOut' }, 'split')
    .fromTo(splitRight, { x: 0 }, { x: SPREAD, duration: 0.8, ease: 'power3.inOut' }, 'split')
    .to(reveal, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 'split+=0.2')
    .to({}, { duration: 0.4 })

  // 3. Photo window grows by literally resizing width/height (not
  // transform:scale) so the source image is re-sampled crisp at every size,
  // straight to full viewport — landing on the real hero banner (Figma
  // keyframe 3). Deliberate exception to the transform/opacity-only
  // animation rule for this one element.
  tl.to(splitWrap, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 'expand')
    .to(
      reveal,
      { width: window.innerWidth, height: window.innerHeight, duration: 1.4, ease: 'power4.in' },
      'expand',
    )
    .to(preloader, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 'expand+=1.05')
    .to(
      heroCopy ? heroCopy.children : [],
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
      'expand+=1.2',
    )
    .to(
      heroCtas ? heroCtas.children : [],
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      'expand+=1.4',
    )
}

// ============================================================
// End: preloader.js
// ============================================================
