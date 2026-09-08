// ============================================================
// aboutSection.js — Scroll-scrubbed staggered reveal for the
// home-page about-section image collage + copy
// Used on: pages with .about-section
// ============================================================

export default function initAboutSection() {
  const section = document.querySelector('.about-section');
  if (!section || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const img1 = section.querySelector('.about-section__img-1');
  const img2 = section.querySelector('.about-section__img-2');
  const img3 = section.querySelector('.about-section__img-3');
  const img4 = section.querySelector('.about-section__img-4');
  const img5 = section.querySelector('.about-section__img-5');
  const content = section.querySelector('.about-section__content');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 65%',
      end: 'center 60%',
      scrub: true,
    },
  });

  // Each image slides in from a different edge while fading in over a
  // shorter window at the start of its slide — mirrors the reference's
  // per-tile stagger, expressed here as GSAP timeline position offsets.
  if (img1) {
    tl.fromTo(img1, { x: -160 }, { x: 0, ease: 'none', duration: 1 }, 0);
    tl.fromTo(img1, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.4 }, 0);
  }
  if (img2) {
    tl.fromTo(img2, { y: -160 }, { y: 0, ease: 'none', duration: 1 }, 0);
    tl.fromTo(img2, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.4 }, 0.05);
  }
  if (img3) {
    tl.fromTo(img3, { x: 160 }, { x: 0, ease: 'none', duration: 1 }, 0);
    tl.fromTo(img3, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.4 }, 0.05);
  }
  if (img4) {
    tl.fromTo(img4, { y: 160 }, { y: 0, ease: 'none', duration: 1 }, 0);
    tl.fromTo(img4, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.4 }, 0.15);
  }
  if (img5) {
    tl.fromTo(img5, { y: 160 }, { y: 0, ease: 'none', duration: 0.95 }, 0.05);
    tl.fromTo(img5, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.4 }, 0.2);
  }
  if (content) {
    tl.fromTo(content, { y: 50 }, { y: 0, ease: 'none', duration: 0.7 }, 0.2);
    tl.fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.5 }, 0.2);
  }
}

// ============================================================
// End: aboutSection.js
// ============================================================
