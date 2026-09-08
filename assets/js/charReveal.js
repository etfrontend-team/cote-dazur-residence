// ============================================================
// charReveal.js — Character-by-character scroll-scrubbed opacity
// reveal for [data-char-reveal] elements (e.g. the quote statement).
// ============================================================

export default function initCharReveal() {
  const els = document.querySelectorAll('[data-char-reveal]');
  if (!els.length || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  els.forEach((el) => {
    const words = el.textContent.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return;

    el.textContent = '';
    const chars = [];
    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'reveal-word';
      Array.from(word).forEach((ch) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'reveal-char';
        charSpan.textContent = ch;
        wordSpan.appendChild(charSpan);
        chars.push(charSpan);
      });
      el.appendChild(wordSpan);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(chars, { opacity: 1 });
      return;
    }

    gsap.set(chars, { opacity: 0 });
    gsap.to(chars, {
      opacity: 1,
      stagger: 0.02,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 35%',
        scrub: true,
      },
    });
  });
}

// ============================================================
// End: charReveal.js
// ============================================================
