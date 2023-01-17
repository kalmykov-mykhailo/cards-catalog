'use strict';

const rootElement = document.getElementById('root');
const catalog = document.getElementById('catalog');
const cardsTotalAmount = 32;
const step = 3;
const sizeImages = '1800/1800';

function createCardItem(id) {
  const element = document.createElement('li');
  element.classList.add('card');
  element.textContent = `Card Item ${id}`
  
  return element;
}

function createImage(id) {
  const element = document.createElement('img');
  element.classList.add('card__image');
  element.id = id;
  element.dataset.src = `https://picsum.photos/id/${id}/${sizeImages}`;
  element.alt = `image-id-${id}`;
  element.src = `https://picsum.photos/id/1/1/1`;

  return element;
}

function createListeners(element) {
  const initialSrc = element.dataset.src;
  element.addEventListener('mouseenter', () => {
    const newId = +element.id + 1;

    element.src = `https://picsum.photos/id/${newId}/${sizeImages}`;
  })

  element.addEventListener('mouseleave', () => {
    element.src = initialSrc;
  })
}

for (let index = 1; index <= cardsTotalAmount * step; index += step) {
  const liElement = createCardItem(index);
  const staticImgElement = createImage(index);
  const dynamicImgElemen = createImage(index + 2);

  createListeners(staticImgElement);

  liElement.appendChild(staticImgElement);
  liElement.appendChild(dynamicImgElemen);
  catalog.appendChild(liElement);
}

for (let index = 2; index < cardsTotalAmount * step; index += step) {
  preloadImage(index)
}

function preloadImage(id) {
  setSrc(new Image(), id);
}

const lazyImages = document.querySelectorAll('img[data-src]');
const windowHeigth = document.documentElement.clientHeight;

let lazyImagesPosition = [];
if (lazyImages.length > 0) {
  lazyImages.forEach(img => {
    if (img.dataset.src) {
      lazyImagesPosition.push(img.getBoundingClientRect().top + scrollY);
      lazyScrollCheck();
    }
  })
}

window.addEventListener('scroll', lazyScroll);

function lazyScroll() {
  if (document.querySelectorAll('img[data-src]').length > 0) {
    lazyScrollCheck();
  }
}

function lazyScrollCheck() {
  let imgIndex = lazyImagesPosition.findIndex(
    item => scrollY > item - windowHeigth
  );

  if (imgIndex >= 0) {
    if (lazyImages[imgIndex].dataset.src) {
      lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
      lazyImages[imgIndex].removeAttribute('data-src')
    }
  }

  delete lazyImagesPosition[imgIndex];
}

