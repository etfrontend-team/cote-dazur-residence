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

  function framePaddingLeft() {
    return parseFloat(getComputedStyle(frame).paddingLeft) || 0;
  }

  function travelDistance() {
    return film.scrollWidth - frame.clientWidth + framePaddingLeft();
  }

  function syncHeight() {
    content.style.height = `${travelDistance() + frame.clientHeight}px`;
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
    x: () => -travelDistance(),
    ease: 'none',
  });

  section.querySelectorAll('.image-variant-1 img').forEach((img) => {
    const slide = img.closest('.hz-slide');
    if (!slide) return;
    gsap.set(img, { transformOrigin: '50% 50%' });
    gsap.fromTo(
      img,
      { scale: 1 },
      {
        scale: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: slide,
          containerAnimation: master,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      }
    );
  });

  section.querySelectorAll('.image-variant-2 img').forEach((img) => {
    const slide = img.closest('.hz-slide');
    if (!slide) return;
    gsap.set(img, { transformOrigin: '50% 50%' });
    gsap.fromTo(
      img,
      { scale: 1 },
      {
        scale: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: slide,
          containerAnimation: master,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      }
    );
  });

  function baseXPercent(el) {
    const matrix = new DOMMatrix(getComputedStyle(el).transform);
    const width = el.offsetWidth || 1;
    return (matrix.m41 / width) * 100;
  }

  section.querySelectorAll('.image-variant-3, .image-variant-4').forEach((wrap) => {
    const slide = wrap.closest('.hz-slide');
    const img = wrap.querySelector('img');
    if (!slide || !img) return;

    const base = baseXPercent(wrap);
    const trigger = {
      trigger: slide,
      containerAnimation: master,
      start: 'left right',
      end: 'right left',
      scrub: true,
    };

    gsap.fromTo(
      wrap,
      { xPercent: base - 15 },
      { xPercent: base + 15, ease: 'none', scrollTrigger: { ...trigger } }
    );

    gsap.set(img, { transformOrigin: '50% 50%', scale: 1.5 });
    gsap.fromTo(
      img,
      { xPercent: 20 },
      { xPercent: -20, ease: 'none', scrollTrigger: { ...trigger } }
    );
  });

  // section.querySelectorAll('.hz-slide__info').forEach((info) => {
  //   gsap.from(info, {
  //     opacity: 0,
  //     y: 24,
  //     ease: 'power1.out',
  //     scrollTrigger: {
  //       trigger: info,
  //       containerAnimation: master,
  //       start: 'left 85%',
  //       end: 'left 45%',
  //       scrub: true,
  //     },
  //   });
  // });

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
