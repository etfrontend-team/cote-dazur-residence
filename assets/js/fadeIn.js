// ============================================================
// fadeIn.js — Scroll-triggered fade + rise-in for [data-fade] elements
// Used on: any page with [data-fade] nodes
// ============================================================

export default function initFadeIn() {
  const els = document.querySelectorAll('[data-fade]');
  if (!els.length) return;

  if (!window.gsap || !window.ScrollTrigger) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  els.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      },
    );
  });
}

// ============================================================
// End: fadeIn.js
// ============================================================
