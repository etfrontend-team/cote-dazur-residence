// ============================================================
// textImageBannerReveal.js — Clip-path scroll reveal + parallax for
// .text-image-banner__media. On scroll-into-view the banner wipes
// in top-to-bottom via clip-path; as the user scrolls past, the
// inner image translates on Y at a slower rate (parallax depth).
// ============================================================

export default function initTextImageBannerReveal() {
  const banners = document.querySelectorAll(".text-image-banner__media");
  if (!banners.length || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  banners.forEach((banner) => {
    const img = banner.querySelector("img, video");

    gsap.fromTo(
      banner,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: banner,
          start: "top 85%",
        },
      },
    );

    if (!img) return;

    gsap.fromTo(
      img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );
  });
}

// ============================================================
// End: textImageBannerReveal.js
// ============================================================
