// ============================================================
// lenis.js — Smooth scroll setup using Lenis library
// Used on: All pages
// ============================================================

export default function initLenis() {
  if (!window.Lenis || !window.gsap || !window.ScrollTrigger) return;

  const lenis = new window.Lenis({
    lerp: 0.1,
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    syncTouch: true,
  });

  window.siteLenis = lenis;

  // Keep Lenis and ScrollTrigger on the same GSAP tick (recommended Lenis integration).
  lenis.on('scroll', window.ScrollTrigger.update);

  window.gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  window.gsap.ticker.lagSmoothing(0);
}

// ============================================================
// End: lenis.js
// ============================================================
