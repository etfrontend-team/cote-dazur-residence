// ============================================================
// mapReveal.js — Pinned reveal for the Contact page's embedded map.
// Mirrors scrollRevealGallery.js's center-image technique: the map grows
// from a small clipped box to full-bleed (clip-path inset animated toward
// 0) while the section stays pinned, then the copy fades in.
// Used on: pages/contactus.html (.map-section)
// ============================================================

export default function initMapReveal() {
  const section = document.querySelector(".map-section");
  const track = section
    ? section.querySelector(".map-section__track")
    : null;
  const frame = section
    ? section.querySelector(".map-section__frame")
    : null;
  const copy = section ? section.querySelector(".map-section__copy") : null;

  if (
    !section ||
    !track ||
    !frame ||
    !copy ||
    !window.gsap ||
    !window.ScrollTrigger
  )
    return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(frame, { clipPath: "inset(0% 0%)" });
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
      frame,
      { clipPath: "inset(27% 30%)" },
      { clipPath: "inset(0% 0%)", ease: "none", duration: 1 },
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
// End: mapReveal.js
// ============================================================
