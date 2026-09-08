// ============================================================
// lightboxGallery.js — Click-to-open image viewer for
// [data-lightbox] triggers (see .gallery-grid__trigger). Nav list is
// built by de-duplicating on image src (first DOM occurrence wins) so
// a filtered/hidden grid can't shift the prev/next order.
// Used on: pages/gallery.html (#lightbox)
// ============================================================

export default function initLightboxGallery() {
  const lightbox = document.getElementById("lightbox");
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (!lightbox || !triggers.length) return;

  const img = lightbox.querySelector(".lightbox__img");
  const closeBtn = lightbox.querySelector(".lightbox__close");
  const prevBtn = lightbox.querySelector(".lightbox__prev");
  const nextBtn = lightbox.querySelector(".lightbox__next");

  const seen = new Set();
  const items = [];
  triggers.forEach((trigger) => {
    const triggerImg = trigger.querySelector("img");
    if (!triggerImg || seen.has(triggerImg.src)) return;
    seen.add(triggerImg.src);
    items.push({ src: triggerImg.src, alt: triggerImg.alt });
  });

  let activeIndex = 0;

  const render = () => {
    const item = items[activeIndex];
    img.src = item.src;
    img.alt = item.alt;
  };

  const open = (index) => {
    activeIndex = index;
    render();
    lightbox.classList.add("is-active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const step = (delta) => {
    activeIndex = (activeIndex + delta + items.length) % items.length;
    render();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const triggerImg = trigger.querySelector("img");
      const index = items.findIndex((item) => item.src === triggerImg.src);
      open(index === -1 ? 0 : index);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-active")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });
}

// ============================================================
// End: lightboxGallery.js
// ============================================================
