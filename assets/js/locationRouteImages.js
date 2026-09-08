// ============================================================
// locationRouteImages.js — Hovering a .becici-section__route swaps
// the active .becici-section__media-item (opacity crossfade) via
// matching [data-route-image] values. Purely decorative media, so
// nothing reverts on mouseleave — the last-hovered route's image stays.
// Used on: pages/location.html (.becici-section)
// ============================================================

export default function initLocationRouteImages() {
  const routes = document.querySelectorAll(
    ".becici-section__route[data-route-image]",
  );
  const items = document.querySelectorAll(".becici-section__media-item");
  if (!routes.length || !items.length) return;

  routes.forEach((route) => {
    route.addEventListener("mouseenter", () => {
      const id = route.dataset.routeImage;
      items.forEach((item) => {
        item.classList.toggle("is-active", item.dataset.routeImage === id);
      });
    });
  });
}

// ============================================================
// End: locationRouteImages.js
// ============================================================
