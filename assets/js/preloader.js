// ============================================================
// preloader.js — Bend Club loader (matches reference timeline)
// ============================================================

export default function initPreloader() {
  const preloader = document.querySelector('[data-preloader]')
  if (!preloader) return

  const box = preloader.querySelector('[data-preloader-box]')
  const growing = preloader.querySelector('[data-preloader-growing]')
  const coverExtras = preloader.querySelectorAll('[data-preloader-cover-extra]')
  const track = preloader.querySelector('.preloader-section__track')
  const wordStart = preloader.querySelector('.preloader-section__word--start')
  const wordEnd = preloader.querySelector('.preloader-section__word--end')
  const wordImgs = preloader.querySelectorAll('.preloader-section__word-img')
  const heroMedia = document.querySelector('.hero-section__media')
  const fadeWords = document.querySelectorAll('.hero-fade-word')
  const fadeIns = document.querySelectorAll('.hero-fade-in')

  const finish = () => {
    preloader.style.display = 'none'
    preloader.setAttribute('aria-hidden', 'true')
    window.gsap?.set(growing, { clearProps: 'all' })
    window.gsap?.set([...fadeWords, ...fadeIns], {
      clearProps: 'opacity,visibility,transform',
    })
    if (heroMedia) window.gsap.set(heroMedia, { autoAlpha: 1 })
    preloader.classList.remove('is-expanding')
    document.body.classList.remove('is-preloading')
    window.siteLenis?.start()
  }

  window.siteLenis?.stop()

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!window.gsap || prefersReducedMotion) {
    finish()
    return
  }

  const gsap = window.gsap
  const failSafe = setTimeout(finish, 9000)

  const em = parseFloat(getComputedStyle(track).fontSize) || 60
  const BOX_W = (218 / 129) * em
  const BOX_H = (137 / 129) * em
  const viewportW = window.innerWidth
  const viewportH = window.innerHeight

  gsap.set(growing, { width: '0%', height: '100%' })
  gsap.set(box, { width: 0, height: BOX_H, overflow: 'hidden' })
  gsap.set(wordImgs, { yPercent: 100 })
  gsap.set(heroMedia, { autoAlpha: 0 })
  gsap.set(fadeWords, { autoAlpha: 0, y: '0.55em' })
  gsap.set(fadeIns, { autoAlpha: 0, y: 28 })

  const pinGrowing = () => {
    const rect = growing.getBoundingClientRect()
    if (rect.width < 1) return

    gsap.set(growing, {
      position: 'fixed',
      left: rect.left + rect.width / 2,
      top: rect.top + rect.height / 2,
      xPercent: -50,
      yPercent: -50,
      width: rect.width,
      height: rect.height,
      zIndex: 15,
    })
    preloader.classList.add('is-expanding')
  }

  const tl = gsap.timeline({
    defaults: { ease: 'expo.inOut' },
    onComplete: () => {
      clearTimeout(failSafe)
      finish()
    },
  })

  // Phase 1 — logo split + center image opens
  tl.fromTo(wordImgs, { yPercent: 100 }, { yPercent: 0, duration: 1.25, stagger: 0.12 })
    .fromTo(box, { width: 0 }, { width: BOX_W, duration: 1.25 }, '<1.05')
    .fromTo(growing, { width: '0%' }, { width: '100%', duration: 1.25 }, '<')
    .fromTo(wordStart, { x: '0em' }, { x: '-0.05em', duration: 1.25 }, '<')
    .fromTo(wordEnd, { x: '0em' }, { x: '0.05em', duration: 1.25 }, '<')
    .addLabel('split')

  // Phase 2 — show one center image at a time before the banner opens.
  coverExtras.forEach((cover, index) => {
    tl.to(cover, { opacity: 0, duration: 0.18, ease: 'power1.out' }, `split+=${0.55 + index * 0.55}`)
  })
  tl.addLabel('imageSequenceDone', `split+=${0.55 + coverExtras.length * 0.55}`)

  // Phase 3 — expand the final image into the hero banner.
  tl.add(pinGrowing, 'imageSequenceDone+=0.1')
    .to(growing, { width: viewportW, height: viewportH, duration: 1.7 }, 'imageSequenceDone+=0.1')
    .to(box, { width: viewportW * 1.1, duration: 1.7 }, 'imageSequenceDone+=0.1')
    .to(preloader, { backgroundColor: 'rgba(255,255,255,0)', duration: 0.6 }, 'imageSequenceDone+=0.1')
    .to([wordStart, wordEnd], { autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, 'imageSequenceDone+=0.45')
    .to(heroMedia, { autoAlpha: 1, duration: 0.01 }, 'imageSequenceDone+=1.7')

  // Phase 4 — hero text during expand.
  tl.fromTo(
      fadeWords,
      { autoAlpha: 0, y: '0.55em' },
      { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.06 },
      'imageSequenceDone+=1.45',
    )
    .fromTo(
      fadeIns,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.95, ease: 'expo.out', stagger: 0.08 },
      'imageSequenceDone+=1.55',
    )
}

// ============================================================
// End: preloader.js
// ============================================================
