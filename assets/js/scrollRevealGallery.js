// ============================================================
// scrollRevealGallery.js — Pinned reveal: the center image grows from a
// small clipped box to full-bleed (clip-path inset animated toward 0)
// while the two flanking side images slide off-canvas in lockstep
// (xPercent tied to the same scroll progress), then the copy fades in.
// Used on: pages/location.html (.scroll-reveal-gallery)
// ============================================================

export default function initScrollRevealGallery() {
  const section = document.querySelector(".scroll-reveal-gallery");
  const track = section
    ? section.querySelector(".scroll-reveal-gallery__track")
    : null;
  const center = section
    ? section.querySelector(".scroll-reveal-gallery__center")
    : null;
  const sideLeft = section
    ? section.querySelector(".scroll-reveal-gallery__side--left")
    : null;
  const sideRight = section
    ? section.querySelector(".scroll-reveal-gallery__side--right")
    : null;
  const copy = section
    ? section.querySelector(".scroll-reveal-gallery__copy")
    : null;

  if (
    !section ||
    !track ||
    !center ||
    !sideLeft ||
    !sideRight ||
    !copy ||
    !window.gsap ||
    !window.ScrollTrigger
  )
    return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(center, { clipPath: "inset(0% 0%)" });
    gsap.set(copy, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(copy, { opacity: 0, y: 24 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    })
    .fromTo(
      center,
      { clipPath: "inset(27% 30%)" },
      { clipPath: "inset(0% 0%)", ease: "none", duration: 1 },
      0,
    )
    .fromTo(
      sideLeft,
      { xPercent: 0 },
      { xPercent: -300, ease: "none", duration: 1 },
      0,
    )
    .fromTo(
      sideRight,
      { xPercent: 0 },
      { xPercent: 300, ease: "none", duration: 1 },
      0,
    )
    .fromTo(
      copy,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, ease: "none", duration: 0.4 },
      0.6,
    );
}

// ============================================================
// End: scrollRevealGallery.js
// ============================================================
