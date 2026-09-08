// ============================================================
// specListSection.js — Hover/focus-driven image swap for
// .spec-list-section: hovering (or keyboard-focusing) a list item
// crossfades the matching image into view on the right.
// Used on: pages/amenities.html
// ============================================================

export default function initSpecListSection() {
  const items = document.querySelectorAll(".spec-list-section__item");
  const images = document.querySelectorAll(".spec-list-section__img");
  if (!items.length || !images.length) return;

  const activate = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    images.forEach((img) => img.classList.toggle("is-active", img === target));
    items.forEach((item) =>
      item.classList.toggle(
        "is-active",
        item.dataset.specItem === targetId,
      ),
    );
  };

  items.forEach((item) => {
    const targetId = item.dataset.specItem;
    if (!targetId) return;

    item.addEventListener("mouseenter", () => activate(targetId));
    item.addEventListener("focus", () => activate(targetId));
  });
}

// ============================================================
// End: specListSection.js
// ============================================================
