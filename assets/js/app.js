// ============================================================
// app.js — Main entry point
// Imports and initializes all custom JS modules
// Attach only this file to every HTML page
// ============================================================

import Lenis from '/node_modules/lenis/dist/lenis.mjs';
import { gsap } from '/node_modules/gsap/index.js';
import { ScrollTrigger } from '/node_modules/gsap/ScrollTrigger.js';

import initLenis from './lenis.js';
import initHeader, { initHorizontalSectionHeaderToggle } from './header.js';
import initPreloader from './preloader.js';
import initHorizontalScroll from './horizontalScroll.js';
import initResidencesSlider from './residencesSlider.js';
import initTestimonialCard from './testimonialCard.js';
import initFadeIn from './fadeIn.js';
import initTextFillAnimation from './textFillAnimation.js';
import initIntroductionReveal from './introductionReveal.js';
import initLocationPins from './locationPins.js';

window.Lenis = Lenis;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initHeader();
  initPreloader();
  initHorizontalScroll();
  initHorizontalSectionHeaderToggle();
  initResidencesSlider();
  initTestimonialCard();
  initFadeIn();
  initTextFillAnimation();
  initIntroductionReveal();
  initLocationPins();
});
