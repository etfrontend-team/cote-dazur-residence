// ============================================================
// testimonialCard.js — Scroll-driven translateY + rotateZ on testimonial card
// Mirrors Framer Motion spring(stiffness:300, damping:60, mass:0.6) scroll animation
// Used on: pages with .testimonial-card__wrap
// ============================================================

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mapProgress(p, stops, values) {
  if (p <= stops[0]) return values[0];
  const last = stops.length - 1;
  if (p >= stops[last]) return values[last];
  for (let i = 0; i < last; i += 1) {
    if (p >= stops[i] && p <= stops[i + 1]) {
      const t = (p - stops[i]) / (stops[i + 1] - stops[i]);
      return lerp(values[i], values[i + 1], t);
    }
  }
  return values[last];
}

export default function initTestimonialCard() {
  const wrap = document.querySelector('.testimonial-card__wrap');
  const card = document.querySelector('.testimonial-card');
  if (!wrap || !card || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const STIFFNESS = 300;
  const DAMPING = 60;
  const MASS = 0.6;
  const STOPS = [0, 0.5, 1];
  const TRANSLATE_Y = [30, 0, -10];
  const ROTATE_DESKTOP = [-4.5, 0, 1];
  const ROTATE_MOBILE = [-1.5, 0, 0.5];

  const mobileQuery = window.matchMedia('(max-width: 767px)');

  let target = 0;
  let progress = 0;
  let velocity = 0;

  ScrollTrigger.create({
    trigger: wrap,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate(self) {
      target = self.progress;
    },
  });

  gsap.ticker.add((time, deltaMs) => {
    const dt = Math.min(deltaMs / 1000, 1 / 30);
    const displacement = progress - target;
    const acceleration =
      (-STIFFNESS * displacement - DAMPING * velocity) / MASS;
    velocity += acceleration * dt;
    progress += velocity * dt;

    const rotateStops = mobileQuery.matches ? ROTATE_MOBILE : ROTATE_DESKTOP;

    gsap.set(wrap, { yPercent: mapProgress(progress, STOPS, TRANSLATE_Y) });
    gsap.set(card, { rotateZ: mapProgress(progress, STOPS, rotateStops) });
  });
}

// ============================================================
// End: testimonialCard.js
// ============================================================
