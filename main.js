'use strict';

const rootElement = document.getElementById('root');
const catalog = document.getElementById('catalog');
const totalCardAmount = 36;
const sizeImages = '1800/1800';
const step = 3;
let cardsToDisplay = totalCardAmount / 3;
let initilIndex = 1;

function createCardItem(id) {
  const element = document.createElement('li');
  element.classList.add('card');
  element.textContent = `Card Item ${id}`

  return element;
}

function setSrc(imgEl, id) {
  imgEl.src = `https://picsum.photos/id/${id}/${sizeImages}`;

  imgEl.onerror = () => {
    const newId = id + totalCardAmount * 3;
    imgEl.id = newId;
    setSrc(imgEl, newId);
    createListeners(imgEl);
  };
}

function createImage(id) {
  const element = document.createElement('img');
  element.classList.add('card__image');
  element.id = id;
  element.alt = `image-id-${id}`;
  setSrc(element, id)

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

function generateCards() {
  for (let index = initilIndex; index <= cardsToDisplay * step; index += step) {
    const liElement = createCardItem(index);
    const staticImgElement = createImage(index);
    const dynamicImgElemen = createImage(index + 2);
  
    createListeners(staticImgElement);
  
    liElement.appendChild(staticImgElement);
    liElement.appendChild(dynamicImgElemen);
    catalog.appendChild(liElement);
  }

  if (cardsToDisplay >= totalCardAmount) {
    catalog.removeEventListener("scroll", scrollListener)
  }
}

function scrollListener() {
  if (catalog.scrollTop >= (catalog.scrollHeight - catalog.clientHeight) * 0.8) {
    initilIndex = cardsToDisplay * 3 + 1;
    cardsToDisplay += cardsToDisplay;
    generateCards();
  }
}

catalog.addEventListener("scroll", scrollListener);

generateCards()