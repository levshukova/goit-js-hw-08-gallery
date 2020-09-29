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
       href="${original}"
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
  evt.preventDefault();

  const imageEl = evt.target;
  const url = imageEl.dataset.source;

  modalEl.classList.add("is-open");
  lightboxImageEl.src = url;
  lightboxImageEl.alt = evt.target.alt;

  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", scrollImages);

  // scrollImages(evt);
}

function onButtonCloseClick() {
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", scrollImages);

  modalEl.classList.remove("is-open");
  lightboxImageEl.src = "";
  lightboxImageEl.alt = "";
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

function scrollImages(evt) {
  let imagesOriginLinks = [];
  items.forEach((item) => {
    imagesOriginLinks.push(item.original);
  });
  let description = [];
  items.forEach((item) => description.push(item.description));

  let index = imagesOriginLinks.indexOf(lightboxImageEl.src);
  if (evt.keyCode == "37") {
    if (index === 0) {
      index = imagesOriginLinks.length;
    }
    lightboxImageEl.setAttribute("src", imagesOriginLinks[index - 1]);
    lightboxImageEl.setAttribute("alt", description[index - 1]);
  }
  if (evt.keyCode == "39") {
    if (index < imagesOriginLinks.length - 1) {
    } else {
      index = -1;
    }
    lightboxImageEl.setAttribute("src", imagesOriginLinks[index + 1]);
    lightboxImageEl.setAttribute("alt", description[index + 1]);
  }
}
