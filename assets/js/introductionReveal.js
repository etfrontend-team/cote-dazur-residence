// ============================================================
// introductionReveal.js — Scroll-driven split image reveal
// Used on: pages with .content-block-wrapper
// ============================================================

const MAX_RADIUS = 100;
const TRANSLATE_PERCENT_DESKTOP = 80;
const TRANSLATE_PERCENT_MOBILE = 100;
const MOBILE_MQ = '(max-width: 992px)';

function getTranslatePercent() {
  return window.matchMedia(MOBILE_MQ).matches
    ? TRANSLATE_PERCENT_MOBILE
    : TRANSLATE_PERCENT_DESKTOP;
}

export default function initIntroductionReveal() {
  const wrapper = document.querySelector('.content-block-wrapper');
  if (!wrapper || !window.gsap || !window.ScrollTrigger) return;

  const contentBlock = wrapper.querySelector('.content-block');
  const leftPanel = wrapper.querySelector('.content-block-reveal__panel--left');
  const rightPanel = wrapper.querySelector('.content-block-reveal__panel--right');
  const leftImg = leftPanel?.querySelector('img');
  const rightImg = rightPanel?.querySelector('img');

  if (!contentBlock || !leftPanel || !rightPanel || !leftImg || !rightImg) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const translatePercent = getTranslatePercent();
    gsap.set(contentBlock, { opacity: 1 });
    gsap.set(leftPanel, { xPercent: -translatePercent });
    gsap.set(rightPanel, { xPercent: translatePercent });
    gsap.set(leftImg, { borderTopRightRadius: MAX_RADIUS });
    gsap.set(rightImg, { borderTopLeftRadius: MAX_RADIUS });
    return;
  }

  gsap.set(contentBlock, { opacity: 0 });
  gsap.set(leftImg, { borderTopRightRadius: 0 });
  gsap.set(rightImg, { borderTopLeftRadius: 0 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 85%',
        end: 'top 35%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
    .to(
      leftPanel,
      {
        xPercent: () => -getTranslatePercent(),
        ease: 'none',
      },
      0,
    )
    .to(
      rightPanel,
      {
        xPercent: () => getTranslatePercent(),
        ease: 'none',
      },
      0,
    )
    .to(
      leftImg,
      {
        borderTopRightRadius: MAX_RADIUS,
        ease: 'none',
      },
      0,
    )
    .to(
      rightImg,
      {
        borderTopLeftRadius: MAX_RADIUS,
        ease: 'none',
      },
      0,
    )
    .to(
      contentBlock,
      {
        opacity: 1,
        ease: 'none',
      },
      0,
    );

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
  });
}

// ============================================================
// End: introductionReveal.js
// ============================================================
