// ============================================================
// galleryReveal.js — Clip-path entrance reveal for [data-clip-reveal].
// Grouped by container (.gallery-section__scatter or __grid): one
// ScrollTrigger per container fires when it enters view, then every
// tile inside wipes in together (clip-path inset, top edge 100% -> 0%)
// with a short stagger — a single "gallery loads in" moment rather
// than each tile triggering independently at its own scroll position.
// A tiny transform rides along on the same tween: Chrome can fail to
// repaint an animated clip-path on sibling elements without a forced
// compositor repaint each frame (see will-change/contain-paint on
// .gallery-section__scatter-item / __item in utilities.css).
// Used on: pages/amenities.html (.gallery-section)
// ============================================================

export default function initGalleryReveal() {
  const containers = document.querySelectorAll(
    ".gallery-section__scatter, .gallery-section__grid",
  );
  if (!containers.length) return;

  if (
    !window.gsap ||
    !window.ScrollTrigger ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    containers.forEach((container) => {
      container.querySelectorAll("[data-clip-reveal]").forEach((item) => {
        item.style.clipPath = "inset(0% 0% 0% 0%)";
      });
    });
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  containers.forEach((container) => {
    const items = container.querySelectorAll("[data-clip-reveal]");
    if (!items.length) return;

    gsap.fromTo(
      items,
      { clipPath: "inset(100% 0% 0% 0%)", y: 0 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0.01,
        duration: 1,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
        },
      },
    );
  });
}

// ============================================================
// End: galleryReveal.js
// ============================================================
