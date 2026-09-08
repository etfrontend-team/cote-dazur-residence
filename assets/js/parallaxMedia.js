// ============================================================
// parallaxMedia.js — Scroll-scrubbed vertical motion for media blocks.
// [data-parallax]: image slides slower/faster than scroll inside its
//   own overflow-hidden box.
// [data-shift]: the whole element rises/falls as the page scrolls past
//   its row, offset from its siblings. Optional pixel amplitude via the
//   attribute value (data-shift="150"), defaults to 60. Desktop only
//   (disabled at max-992, same cutoff as the accent media) — each
//   element in a row can carry a different amplitude so the row reads
//   as layered speeds (content fastest, accent medium, main image
//   slowest) rather than moving as one block.
// Used on: any page with [data-parallax] / [data-shift] media wrappers
// ============================================================

export default function initParallaxMedia() {
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  const shiftEls = document.querySelectorAll("[data-shift]");
  if (
    (!parallaxEls.length && !shiftEls.length) ||
    !window.gsap ||
    !window.ScrollTrigger
  )
    return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  parallaxEls.forEach((wrapper) => {
    const media = wrapper.querySelector("img, video");
    if (!media) return;

    gsap.fromTo(
      media,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 993px)", () => {
    shiftEls.forEach((el) => {
      const amplitude = Number(el.dataset.shift) || 60;
      const trigger =
        el.closest(".zigzag-section__row, .parallax-chain__row") || el;

      gsap.fromTo(
        el,
        { y: -amplitude },
        {
          y: amplitude,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    });
  });
}

// ============================================================
// End: parallaxMedia.js
// ============================================================
