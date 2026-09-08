// ============================================================
// galleryFilter.js — Category filter for .gallery-grid.
// Buttons in .gallery-filter-nav set the active filter; every
// .gallery-grid__cell whose [data-category] doesn't match gets
// [hidden]. "all" shows everything and restores the mosaic col-span
// layout; any other filter adds .is-filtered, which switches
// .gallery-grid to a uniform 3-up grid (see utilities.css) so the
// visible cells pack together with no gaps instead of leaving holes
// in the mosaic's fixed col-spans.
// The layout swap itself can't be transitioned (display isn't
// animatable), so it's done while .gallery-grid is faded fully
// transparent (.is-fading, opacity 0 via CSS transition) — the jump
// happens while invisible, then the grid fades back in.
// Used on: pages/gallery.html (.gallery-filter-nav)
// ============================================================

export default function initGalleryFilter() {
  const grid = document.querySelector(".gallery-grid");
  const buttons = document.querySelectorAll(".gallery-filter-nav__btn");
  const cells = document.querySelectorAll(".gallery-grid__cell");
  if (!grid || !buttons.length || !cells.length) return;

  let activeFilter = "all";

  const applyFilter = (filter) => {
    if (filter === activeFilter) return;
    activeFilter = filter;

    buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === filter);
    });

    grid.classList.add("is-fading");

    grid.addEventListener(
      "transitionend",
      () => {
        cells.forEach((cell) => {
          const match = filter === "all" || cell.dataset.category === filter;
          cell.hidden = !match;
        });

        grid.classList.toggle("is-filtered", filter !== "all");

        requestAnimationFrame(() => grid.classList.remove("is-fading"));
      },
      { once: true },
    );
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });
}

// ============================================================
// End: galleryFilter.js
// ============================================================
