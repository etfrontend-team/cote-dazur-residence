// ============================================================
// horizontalScroll.js — Vertical-scroll-driven horizontal filmstrip
// Mirrors the pinned hz-content/hz-frame/hz-film scrub pattern
// Used on: pages with .horizontal-section
// ============================================================

export default function initHorizontalScroll() {
  const section = document.querySelector('.horizontal-section');
  const content = section ? section.querySelector('.hz-content') : null;
  const frame = section ? section.querySelector('.hz-frame') : null;
  const film = section ? section.querySelector('.hz-film') : null;
  if (!section || !content || !frame || !film || !window.gsap || !window.ScrollTrigger) {
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    section.classList.add('horizontal-section--static');
    return;
  }

  function syncHeight() {
    content.style.height = `${film.scrollWidth}px`;
  }
  syncHeight();

  const master = gsap.timeline({
    scrollTrigger: {
      trigger: content,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
    },
  }).to(film, {
    x: () => -(film.scrollWidth - frame.clientWidth),
    ease: 'none',
  });

  section.querySelectorAll('.hz-slide__info').forEach((info) => {
    gsap.from(info, {
      opacity: 0,
      y: 24,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: info,
        containerAnimation: master,
        start: 'left 85%',
        end: 'left 45%',
        scrub: true,
      },
    });
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      syncHeight();
      ScrollTrigger.refresh();
    }, 150);
  });
}

// ============================================================
// End: horizontalScroll.js
// ============================================================
