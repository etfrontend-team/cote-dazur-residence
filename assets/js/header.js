// ============================================================
// header.js — Sticky header scroll state + mobile menu
// Used on: All pages
// ============================================================

function initScrollState(header) {
  const sentinel = document.querySelector('.header-scroll-sentinel');
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.dataset.scrolled = String(!entry.isIntersecting);
    },
    { rootMargin: '80px 0px 0px 0px' },
  );

  observer.observe(sentinel);
}

function initMobileMenu(header) {
  const trigger = header.querySelector('.main-nav__trigger');
  const closeBtn = header.querySelector('.main-nav__close');
  const nav = header.querySelector('.main-nav__links');
  if (!trigger || !closeBtn || !nav) return;

  const links = nav.querySelectorAll('a');

  function openMenu() {
    header.dataset.menuOpen = 'true';
    document.body.dataset.menuOpen = 'true';
    trigger.setAttribute('aria-expanded', 'true');

    if (window.gsap) {
      window.gsap.fromTo(
        links,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.15 },
      );
    }
  }

  function closeMenu() {
    header.dataset.menuOpen = 'false';
    document.body.dataset.menuOpen = 'false';
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.dataset.menuOpen === 'true') {
      closeMenu();
    }
  });
}

function initLangDropdown(header) {
  const wrapper = header.querySelector('.main-nav__lang');
  const toggle = wrapper ? wrapper.querySelector('.main-nav__lang-toggle') : null;
  if (!wrapper || !toggle) return;

  function setOpen(isOpen) {
    wrapper.dataset.open = String(isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  }

  document.addEventListener('click', (event) => {
    if (toggle.contains(event.target)) {
      setOpen(wrapper.dataset.open !== 'true');
      return;
    }
    if (!wrapper.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}

export default function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  initScrollState(header);
  initMobileMenu(header);
  initLangDropdown(header);
}

// ============================================================
// End: header.js
// ============================================================
