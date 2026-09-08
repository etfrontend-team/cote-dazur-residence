// ============================================================
// preloader.js — Omniyat-style hero intro (scroll-driven)
// Flow: logo → shape below screen → rise → spread full white → banner
// ============================================================

export default function initPreloader() {
  const scrollContainer = document.querySelector('[data-hero-scroll]')
  const pinWrap = document.querySelector('[data-hero-pin]')
  const logo = document.querySelector('.hero-loader-logo')
  const shape = document.querySelector('.hero-loader-shape')
  const shapeImg = shape?.querySelector('img')
  const shapeTarget = shapeImg || shape
  const heroBg = document.querySelector('.hero-bg')
  const introOverlay = document.querySelector('[data-hero-intro-overlay]')
  const heroContent = document.querySelector('.hero-content')
  const findProperty = document.querySelector('.find-property')
  const header = document.getElementById('site-header')
  const heroVideo = document.querySelector('.hero-bg video')

  if (!scrollContainer || !pinWrap || !window.gsap || !window.ScrollTrigger) {
    document.body.classList.add('is-ready', 'is-loaded')
    document.body.classList.remove('is-preloading')
    return
  }

  const gsap = window.gsap
  const { ScrollTrigger } = window
  gsap.registerPlugin(ScrollTrigger)

  const getFullSpreadScale = () => {
    if (!shapeTarget) return 5.5
    const scale = gsap.getProperty(shapeTarget, 'scale') || 1
    const rect = shapeTarget.getBoundingClientRect()
    const baseW = rect.width / scale
    const baseH = rect.height / scale
    const byWidth = (window.innerWidth / baseW) * 3.85
    const byHeight = (window.innerHeight / baseH) * 1.75
    return Math.max(byWidth, byHeight)
  }

  const finishIntro = () => {
    document.body.classList.remove('is-preloading')
    document.body.classList.add('is-loaded')
    if (heroVideo) heroVideo.play().catch(() => {})
    ScrollTrigger.refresh()
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('is-ready', 'is-loaded')
    // document.body.classList.remove('is-preloading')
    return
  }

  document.body.classList.add('is-preloading', 'is-ready')

  gsap.set(header, { autoAlpha: 0, y: -16 })
  gsap.set(heroBg, { autoAlpha: 1 })
  gsap.set(heroContent, { autoAlpha: 0, y: 28 })
  if (findProperty) gsap.set(findProperty, { autoAlpha: 0, y: 20 })
  gsap.set(shape, { autoAlpha: 1 })
  if (shapeTarget) {
    gsap.set(shapeTarget, {
      autoAlpha: 0,
      scale: 0.3,
      y: '58vh',
      transformOrigin: '50% 50%',
      mixBlendMode: 'normal',
      force3D: true,
    })
  }
  if (introOverlay) gsap.set(introOverlay, { autoAlpha: 0 })
  if (heroVideo) heroVideo.play().catch(() => {})

  if (logo) {
    gsap.fromTo(logo, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.8, delay: 0.2 })
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollContainer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.85,
      pin: pinWrap,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // TEMP: hide-on-leave disabled — preloader stays visible for now.
      // onLeave: () => finishIntro(),
    },
  })

  if (logo) {
    tl.to(logo, { autoAlpha: 0, scale: 0.92, ease: 'none', duration: 0.1 }, 0.06)
  }

  if (shapeTarget) {
    tl.fromTo(
      shapeTarget,
      { scale: 0.3, y: '58vh', autoAlpha: 0 },
      { scale: 1.38, y: 0, autoAlpha: 0.58, ease: 'none', duration: 0.38 },
      0.08,
    ).to(
      shapeTarget,
      { scale: () => getFullSpreadScale(), autoAlpha: 1, ease: 'none', duration: 0.18 },
      0.46,
    ).to(shapeTarget, { autoAlpha: 0, ease: 'none', duration: 0.12 }, 0.64)
  }

  tl.to(heroContent, { autoAlpha: 1, y: 0, ease: 'none', duration: 0.2 }, 0.66)

  if (header) {
    tl.to(header, { autoAlpha: 1, y: 0, ease: 'none', duration: 0.16 }, 0.82)
  }

  if (findProperty) {
    tl.to(findProperty, { autoAlpha: 1, y: 0, ease: 'none', duration: 0.16 }, 0.9)
  }
}

// ============================================================
// End: preloader.js
// ============================================================
