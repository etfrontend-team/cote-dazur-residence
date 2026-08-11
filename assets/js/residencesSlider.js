// ============================================================
// residencesSlider.js — Desktop: pinned scroll-scrub clip-path reveal.
// Each stacked .residences-slide wipes in right-to-left over the one below
// it as the user scrolls, with a slow Ken Burns zoom on the active image
// (reference: springs.estate's l-residences slider uses a scroll/parallax
// zoom). A scroll-hijacked pin doesn't translate to touch, so mobile
// (<=768px) keeps one stable image in place and fades the block card content
// between Block 1/2/3 tab states.
// Used on: pages with .residences-slider
// ============================================================

function initBlockTabs() {
  const blocks = document.querySelector('.residences-slider__blocks');
  const slides = blocks ? Array.from(blocks.querySelectorAll('.residences-slide')) : [];
  if (!blocks || !slides.length) return;

  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let fadeTimer;

  const setActiveBlock = (targetIndex) => {
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-mobile-active', index === targetIndex);
    });

    blocks.querySelectorAll('.residences-slide__tab').forEach((item) => {
      const isActive = item.dataset.slideTarget === String(targetIndex);
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
  };

  setActiveBlock(0);

  blocks.querySelectorAll('.residences-slide__tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetIndex = Number(tab.dataset.slideTarget);
      const target = slides[targetIndex];
      if (!target) return;

      if (!mobileQuery.matches) {
        target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        return;
      }

      clearTimeout(fadeTimer);
      if (reducedMotionQuery.matches) {
        setActiveBlock(targetIndex);
        return;
      }

      blocks.classList.add('is-content-fading');
      fadeTimer = setTimeout(() => {
        setActiveBlock(targetIndex);
        requestAnimationFrame(() => blocks.classList.remove('is-content-fading'));
      }, 260);
    });
  });
}

export default function initResidencesSlider() {
  initBlockTabs();

  const container = document.querySelector('.residences-slider');
  const track = container ? container.querySelector('.residences-slider__track') : null;
  const slides = track ? track.querySelectorAll('.residences-slide') : [];
  if (!container || !track || slides.length < 2) return;

  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  slides.forEach((slide, i) => {
    if (i === 0) return;
    gsap.set(slide, { clipPath: 'inset(0% 0% 0% 100%)' });
  });

  const totalDuration = slides.length - 1;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${(slides.length - 1) * window.innerHeight}`,
      scrub: true,
      pin: true,
      invalidateOnRefresh: true,
    },
  });

  slides.forEach((slide, i) => {
    if (i === 0) return;
    timeline.to(slide, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, i - 1);
  });

  slides.forEach((slide, i) => {
    const img = slide.querySelector('.residences-slide__media img');
    if (!img) return;
    const startPos = i === 0 ? 0 : i - 1;
    timeline.fromTo(
      img,
      { scale: 1 },
      { scale: 1.15, duration: totalDuration - startPos, ease: 'none' },
      startPos,
    );
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
  });
}

// ============================================================
// End: residencesSlider.js
// ============================================================
