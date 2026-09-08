// ============================================================
// testimonialsReveal.js — Sticky image panel synced to the review
// list scrolling past it: IntersectionObserver picks whichever
// .testimonials-item is crossing the vertical center, swaps the
// matching .testimonials-panel-slide and flips the counter number.
// Panel images also slow-zoom out via GSAP scrub across the whole
// section's scroll range (reference: Comfora testimonials section).
// Used on: pages with .testimonials-section
// ============================================================

export default function initTestimonialsReveal() {
  const section = document.querySelector('.testimonials-section');
  const items = section ? Array.from(section.querySelectorAll('.testimonials-item')) : [];
  const slides = section ? Array.from(section.querySelectorAll('.testimonials-panel-slide')) : [];
  const counterNum = section ? section.querySelector('.testimonials-counter-num') : null;
  if (!section || items.length < 2 || slides.length < 2) return;
  if (!window.gsap) return;

  const { gsap } = window;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let activeIndex = 0;

  const setActive = (index) => {
    if (index === activeIndex && slides[index].classList.contains('is-active')) return;
    activeIndex = index;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));

    if (!counterNum) return;
    const label = String(index + 1).padStart(2, '0');
    if (reduced) {
      counterNum.textContent = label;
      return;
    }
    const shift = counterNum.offsetHeight;
    gsap.to(counterNum, {
      y: -shift,
      opacity: 0,
      duration: 0.25,
      ease: 'power1.in',
      onComplete: () => {
        counterNum.textContent = label;
        gsap.fromTo(
          counterNum,
          { y: shift, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        );
      },
    });
  };

  if (!window.matchMedia('(min-width: 769px)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = items.indexOf(entry.target);
        if (index !== -1) setActive(index);
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  );
  items.forEach((item) => observer.observe(item));

  if (reduced || !window.ScrollTrigger) return;
  const { ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const panelImgs = slides.map((slide) => slide.querySelector('img')).filter(Boolean);
  gsap.set(panelImgs, { scale: 1.14, transformOrigin: '50% 50%' });
  gsap.to(panelImgs, {
    scale: 1.02,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });
}

// ============================================================
// End: testimonialsReveal.js
// ============================================================
