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

function setSrc(element, id) {
  element.src = `https://picsum.photos/id/${id}/${sizeImages}`;
}

function createImage(id) {
  const element = document.createElement('img');
  element.classList.add('card__image');
  element.id = id;
  element.loading = 'lazy';
  element.alt = `image-id-${id}`;
  setSrc(element, id);

  return element;
}

function createListeners(element) {
  const initialSrc = element.src;
  element.addEventListener('mouseenter', () => {
    const newId = +element.id + 1;

    setSrc(element, newId);
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
