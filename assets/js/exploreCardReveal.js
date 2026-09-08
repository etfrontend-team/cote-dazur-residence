// ============================================================
// exploreCardReveal.js — Entrance reveal for .explore-card.
// Desktop only (>=993px): .explore-card--reveal switches the media
// to an absolute h-full box (see utilities.css) permanently — object-
// cover's crop is computed against that h-full box, so it must stay
// that size for the whole lifetime of the element; swapping back to a
// static h-320 box after the reveal changes the effective zoom and
// makes the image visibly jump. clip-path animates once, full-open
// (covers the whole card) to its resting (h-320) slice, as the card
// enters the viewport, revealing .explore-card__desc beneath — the
// clipped-away region is excluded from hit-testing by the browser, so
// it never blocks clicks/hover on desc. Progressive enhancement —
// without JS/GSAP the card just stays in its plain resting layout (no
// absolute, no clip-path).
// Used on: pages/residence.html
// ============================================================

const RESTING_MEDIA_HEIGHT = 320;

export default function initExploreCardReveal() {
  const cards = document.querySelectorAll(".explore-card");
  if (!cards.length) return;

  if (
    !window.gsap ||
    !window.ScrollTrigger ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.matchMedia({
    "(min-width: 993px)": () => {
      cards.forEach((card) => {
        const media = card.querySelector(".explore-card__media");
        if (!media) return;

        card.classList.add("explore-card--reveal");

        const bottomClip = Math.max(
          card.offsetHeight - RESTING_MEDIA_HEIGHT,
          0,
        );

        gsap.fromTo(
          media,
          { clipPath: "inset(0px 0px 0px 0px)", y: 0 },
          {
            clipPath: `inset(0px 0px ${bottomClip}px 0px)`,
            // Chrome sometimes fails to repaint an animated clip-path on
            // sibling elements; nudging a transform on the same tween
            // forces a compositor repaint every frame alongside it.
            y: 0.01,
            duration: 1.1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 30%",
            },
          },
        );
      });

      return () => {
        cards.forEach((card) =>
          card.classList.remove("explore-card--reveal"),
        );
      };
    },
  });
}

// ============================================================
// End: exploreCardReveal.js
// ============================================================
