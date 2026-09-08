// ============================================================
// pageLoader.js — #page-loader lifecycle + logo scale-pulse
// Hides #page-loader on window `load` (or after a 6s fallback),
// flags <body> as is-ready so .page-wrap's CSS opacity gate lifts,
// and runs an infinite scale-pulse on the loader logo while it shows.
// Used on: pages with .page-loader
// ============================================================

export default function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    const hide = () => {
      loader.classList.add('is-hidden');
      setTimeout(() => {
        loader.remove();
      }, 500);
    };
    window.addEventListener('load', hide);
    setTimeout(hide, 6000);
  }

  document.body.classList.add('is-ready');

  const logo = document.querySelector('.page-loader__logo');
  if (!logo || !window.gsap) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.gsap.to(logo, {
    scale: 1.12,
    duration: 0.9,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

// ============================================================
// End: pageLoader.js
// ============================================================
