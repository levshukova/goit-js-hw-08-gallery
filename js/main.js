import items from "./gallery-items.js";

const galleryEl = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".lightbox");
const lightboxImageEl = document.querySelector(".lightbox__image");
const buttonCloseEl = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector(".lightbox__overlay");

galleryEl.addEventListener("click", onGalleryCardClick);
buttonCloseEl.addEventListener("click", onButtonCloseClick);
overlayEl.addEventListener("click", onOverlayClick);

const cardsMarkup = createGalleryMarkup(items);
galleryEl.insertAdjacentHTML("beforeend", cardsMarkup);

function createGalleryMarkup(cards) {
  return cards
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a
        class="gallery__link"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li> `;
    })
    .join("");
}

function onGalleryCardClick(evt) {
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const imageEl = evt.target;
  const url = imageEl.dataset.source;

  modalEl.classList.add("is-open");
  lightboxImageEl.src = url;

  window.addEventListener("keydown", onEscKeyPress);
}

function onButtonCloseClick() {
  window.removeEventListener("keydown", onEscKeyPress);

  modalEl.classList.remove("is-open");
  lightboxImageEl.src = "";
}

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onButtonCloseClick();
  }
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onButtonCloseClick();
  }
}
