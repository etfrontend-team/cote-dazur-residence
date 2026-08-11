export default function initLocationPins() {
  const map = document.querySelector('.location-map');
  const popup = document.querySelector('.js-location-popup');
  const pins = document.querySelectorAll('.js-location-pin');

  if (!map || !popup || !pins.length) return;

  const titleEl = popup.querySelector('[data-popup-title]');
  const distanceEl = popup.querySelector('[data-popup-distance]');
  const thumbEl = popup.querySelector('.js-popup-thumb');

  const POPUP_W = 288;
  const POPUP_GAP = 16;
  const CLOSE_ICON = '/assets/images/location-icon-close.svg';

  const positionPopup = (pin) => {
    const mapRect = map.getBoundingClientRect();
    const pinRect = pin.getBoundingClientRect();
    const pinCX = pinRect.left + pinRect.width / 2 - mapRect.left;
    const pinTY = pinRect.top - mapRect.top;

    if (window.innerWidth <= 768) {
      popup.style.left = '';
      popup.style.bottom = '';
      return;
    }

    let popupLeft = pinCX - POPUP_W / 2;
    popupLeft = Math.max(0, Math.min(popupLeft, mapRect.width - POPUP_W));
    const popupBottom = mapRect.height - pinTY + POPUP_GAP;

    popup.style.left = `${popupLeft}px`;
    popup.style.bottom = `${popupBottom}px`;
  };

  const restorePinIcon = (pin) => {
    const img = pin.querySelector('img');
    if (!img || !pin.dataset.pinIconSrc) return;
    img.src = pin.dataset.pinIconSrc;
    img.setAttribute('width', pin.dataset.pinIconW);
    img.setAttribute('height', pin.dataset.pinIconH);
  };

  const activatePinIcon = (pin) => {
    const img = pin.querySelector('img');
    if (!img) return;
    pin.dataset.pinIconSrc = img.src;
    pin.dataset.pinIconW = img.getAttribute('width') || '18';
    pin.dataset.pinIconH = img.getAttribute('height') || '18';
    img.src = CLOSE_ICON;
    img.setAttribute('width', '14');
    img.setAttribute('height', '14');
  };

  const closePopup = () => {
    pins.forEach((p) => {
      if (p.classList.contains('is-active')) restorePinIcon(p);
      p.classList.remove('is-active');
    });
    popup.classList.remove('is-open');
    popup.setAttribute('aria-hidden', 'true');
  };

  const openPopup = (pin) => {
    if (titleEl) titleEl.textContent = pin.getAttribute('data-pin-title') || '';
    if (distanceEl) distanceEl.textContent = pin.getAttribute('data-pin-distance') || '';
    if (thumbEl) {
      const thumb = pin.getAttribute('data-pin-thumb');
      if (thumb) thumbEl.src = thumb;
    }

    pins.forEach((p) => {
      if (p.classList.contains('is-active')) restorePinIcon(p);
      p.classList.remove('is-active');
    });

    pin.classList.add('is-active');
    activatePinIcon(pin);
    positionPopup(pin);
    popup.classList.add('is-open');
    popup.setAttribute('aria-hidden', 'false');
  };

  pins.forEach((pin) => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const isAlreadyOpen =
        pin.classList.contains('is-active') && popup.classList.contains('is-open');
      if (isAlreadyOpen) {
        closePopup();
      } else {
        openPopup(pin);
      }
    });
  });

  popup.addEventListener('click', (e) => e.stopPropagation());
  map.addEventListener('click', () => closePopup());
}
