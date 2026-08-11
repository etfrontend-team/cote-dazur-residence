// ============================================================
// lenis.js — Smooth scroll setup using Lenis library
// Used on: All pages
// ============================================================

export default function initLenis() {
  if (!window.Lenis) return;

  const lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  window.siteLenis = lenis;

  lenis.on('scroll', () => {
    window.ScrollTrigger?.update();
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// ============================================================
// End: lenis.js
// ============================================================
