
/* ─── FILTER DROPDOWNS ───────────────────────────────────────────────────── */

export default function initFilterDropdowns() {
  var filters = document.querySelectorAll('.js-filter-dropdown');
  if (!filters.length) return;

  filters.forEach(function (filter) {
    var trigger = filter.querySelector('.filter-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = filter.classList.contains('is-open');

      /* Close all open dropdowns */
      filters.forEach(function (f) {
        f.classList.remove('is-open');
        var t = f.querySelector('.filter-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      /* Toggle the clicked one */
      if (!isOpen) {
        filter.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Select option: update display value, close dropdown */
  document.querySelectorAll('.filter-option').forEach(function (option) {
    option.addEventListener('click', function () {
      var filter = this.closest('.js-filter-dropdown');
      if (!filter) return;
      var valueEl = filter.querySelector('.filter-value');
      if (valueEl) valueEl.textContent = this.textContent;
      filter.classList.remove('is-open');
      var trigger = filter.querySelector('.filter-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close on outside click */
  document.addEventListener('click', function () {
    filters.forEach(function (f) {
      f.classList.remove('is-open');
      var t = f.querySelector('.filter-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });
}
