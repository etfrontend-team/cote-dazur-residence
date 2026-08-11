// ============================================================
// preloader.js — Bend Club loader (logo split + image sequence only)
// ============================================================

export default function initPreloader() {
  const preloader = document.querySelector('[data-preloader]')
  if (!preloader) return

  const box = preloader.querySelector('[data-preloader-box]')
  const coverExtras = preloader.querySelectorAll('[data-preloader-cover-extra]')
  const track = preloader.querySelector('.preloader-section__track')
  const wordStart = preloader.querySelector('.preloader-section__word--start')
  const wordEnd = preloader.querySelector('.preloader-section__word--end')
  const wordImgs = preloader.querySelectorAll('.preloader-section__word-img')

  const finish = () => {
    preloader.style.display = 'none'
    preloader.setAttribute('aria-hidden', 'true')
    document.body.classList.add('is-loaded')
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

  const em = parseFloat(getComputedStyle(track).fontSize) || 60
  const BOX_W = (218 / 129) * em
  const BOX_H = (137 / 129) * em

  gsap.set(box, { width: 0, height: BOX_H, overflow: 'hidden' })
  gsap.set(wordImgs, { yPercent: 100 })

  const tl = gsap.timeline({
    defaults: { ease: 'expo.inOut' },
    onComplete: () => {
      clearTimeout(failSafe)
      finish()
    },
  })

  // Phase 1 — logo split + box opens.
  tl.fromTo(wordImgs, { yPercent: 100 }, { yPercent: 0, duration: 1.25, stagger: 0.12 })
    .fromTo(box, { width: 0 }, { width: BOX_W, duration: 1.25 }, '<1.05')
    .fromTo(wordStart, { x: '0em' }, { x: '-0.05em', duration: 1.25 }, '<')
    .fromTo(wordEnd, { x: '0em' }, { x: '0.05em', duration: 1.25 }, '<')
    .addLabel('split')

  // Phase 2 — swap the 3 cover images, one at a time.
  coverExtras.forEach((cover, index) => {
    tl.to(cover, { opacity: 0, duration: 0.18, ease: 'power1.out' }, `split+=${0.55 + index * 0.55}`)
  })
  tl.addLabel('imagesDone', `split+=${0.55 + coverExtras.length * 0.55}`)

  // Phase 3 — fade the loader out; page-wrap fade-in takes over from there.
  tl.to(preloader, { opacity: 0, duration: 0.4 }, 'imagesDone+=0.3')
}

// ============================================================
// End: preloader.js
// ============================================================
