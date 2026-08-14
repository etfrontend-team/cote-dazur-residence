// ============================================================
// textFillAnimation.js — Word-by-word scroll-scrubbed color fill
// Each word in [data-fill-text] fades from a dim tone to the
// primary color as the paragraph scrolls through view.
// ============================================================

export default function initTextFillAnimation() {
  const paragraphs = document.querySelectorAll('[data-fill-text]');
  if (!paragraphs.length || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const dimColor = 'rgba(10, 10, 61, 0.36)';
  const fillColor = '#0A0A3D';

  paragraphs.forEach((paragraph) => {
    const words = paragraph.textContent.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return;

    paragraph.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'fill-word';
      span.textContent = word;
      paragraph.appendChild(span);
      if (i < words.length - 1) paragraph.appendChild(document.createTextNode(' '));
    });

    const wordEls = paragraph.querySelectorAll('.fill-word');
    const total = wordEls.length;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(wordEls, { color: fillColor });
      return;
    }

    ScrollTrigger.create({
      trigger: paragraph,
      start: 'top 85%',
      end: 'top 35%',
      scrub: true,
      onUpdate(self) {
        wordEls.forEach((el, i) => {
          const start = i / total;
          const end = Math.min((i + 5) / total, 1);
          const wordProgress = gsap.utils.clamp(0, 1, (self.progress - start) / (end - start));
          gsap.set(el, { color: gsap.utils.interpolate(dimColor, fillColor, wordProgress) });
        });
      },
    });
  });
}
