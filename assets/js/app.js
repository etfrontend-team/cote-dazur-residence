// ============================================================
// app.js — Main entry point
// Imports and initializes all custom JS modules
// Attach only this file to every HTML page
// ============================================================

import Lenis from '/node_modules/lenis/dist/lenis.mjs';
import { gsap } from '/node_modules/gsap/index.js';
import { ScrollTrigger } from '/node_modules/gsap/ScrollTrigger.js';
import Swiper from '/node_modules/swiper/swiper-bundle.min.mjs';

import initLenis from './lenis.js';
import initSwiper from './swiper.js';
import initHeader from './header.js';
// import initPreloader from './preloader.js';
import initTestimonialCard from './testimonialCard.js';
import initHorizontalScroll from './horizontalScroll.js';

window.Lenis = Lenis;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.Swiper = Swiper;

window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initSwiper();
  initHeader();
  // initPreloader();
  initTestimonialCard();
  initHorizontalScroll();
});
