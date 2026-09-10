// ============================================================
// app.js — Main entry point
// Imports and initializes all custom JS modules
// Attach only this file to every HTML page
// ============================================================

import Lenis from "../../node_modules/lenis/dist/lenis.mjs";
import { gsap } from "../../node_modules/gsap/index.js";
import { ScrollTrigger } from "../../node_modules/gsap/ScrollTrigger.js";

import initLenis from "./lenis.js";
import initHeader, { initHorizontalSectionHeaderToggle } from "./header.js";
import initPreloader from "./preloader.js";
import initPageLoader from "./pageLoader.js";
import initHorizontalScroll from "./horizontalScroll.js";
import initResidencesSlider from "./residencesSlider.js";
import initTestimonialCard from "./testimonialCard.js";
import initFadeIn from "./fadeIn.js";
import initExploreCardReveal from "./exploreCardReveal.js";
import initParallaxMedia from "./parallaxMedia.js";
import initMapReveal from "./mapReveal.js";
import initInnerHero from "./innerHero.js";
import initAboutSection from "./aboutSection.js";
import initCharReveal from "./charReveal.js";
import initTestimonialsReveal from "./testimonialsReveal.js";
import initTextFillAnimation from "./textFillAnimation.js";
import initIntroductionReveal from "./introductionReveal.js";
import initLocationPins from "./locationPins.js";
import initLocationRouteImages from "./locationRouteImages.js";
import initScrollRevealGallery from "./scrollRevealGallery.js";
import initSpecListSection from "./specListSection.js";
import initGalleryReveal from "./galleryReveal.js";
import initLightboxGallery from "./lightboxGallery.js";
import initGalleryFilter from "./galleryFilter.js";
import initTextImageBannerReveal from "./textImageBannerReveal.js";

window.Lenis = Lenis;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

window.addEventListener("DOMContentLoaded", () => {
  initLenis();
  initHeader();
  initPreloader();
  initPageLoader();
  // Pin-based triggers (e.g. residences slider) must register before horizontal
  // scroll so pin-spacer layout exists when ScrollTrigger positions are calculated.
  initResidencesSlider();
  initHorizontalScroll();
  initHorizontalSectionHeaderToggle();
  initTestimonialCard();
  initFadeIn();
  initExploreCardReveal();
  initParallaxMedia();
  initMapReveal();
  initInnerHero();
  initAboutSection();
  initCharReveal();
  initTestimonialsReveal();
  initTextFillAnimation();
  initIntroductionReveal();
  initLocationPins();
  initLocationRouteImages();
  initScrollRevealGallery();

  ScrollTrigger.refresh();

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
    // eslint-disable-next-line no-console
    console.log("[app] page loaded");
  });
  initSpecListSection();
  initGalleryReveal();
  initLightboxGallery();
  initGalleryFilter();
  initTextImageBannerReveal();
});
