// ============================================================
// innerHero.js — Sticky inner-hero banner scroll parallax
// Used on: pages with .inner-hero-section (e.g. About)
// ============================================================

export default function initInnerHero() {
  const section = document.querySelector('.inner-hero-section');
  const media = section ? section.querySelector('.inner-hero-section__media-inner') : null;
  const content = section ? section.querySelector('.inner-hero-section__inner') : null;
  if (!section || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const trigger = {
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  };

  if (media) {
    gsap.fromTo(
      media,
      { y: '-4%' },
      { y: '4%', ease: 'none', scrollTrigger: { ...trigger } },
    );
  }

  // Content lifts and blurs out as the pinned section scrolls past — matches
  // the reference site's sticky inner-hero exit animation.
  if (content) {
    gsap.fromTo(
      content,
      { y: 0, filter: 'blur(0px)' },
      { y: -400, filter: 'blur(10px)', ease: 'none', scrollTrigger: { ...trigger } },
    );
  }
}

// ============================================================
// End: innerHero.js
// ============================================================
