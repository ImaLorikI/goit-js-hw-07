import { galleryItems } from './gallery-items.js';
const galery = document.querySelector('.gallery');

const markup = galleryItems.map(({ preview, original, description }) => `
<li class="gallery__item">
<a class="gallery__link" href="${original}">
<img class="gallery__image" src="${preview}" alt="${description}" />
</a>
</li>`).join('');
function onClick(evt) {
  evt.preventDefault();
  const { target } = evt;
  if (target.nodeName !== "IMG") {
    return;
  }
  const imgalt = target.alt;
  const curruntItems = galleryItems.find(
    ({ description }) => description === imgalt
  );

  const instance = basicLightbox.create(`
    <img class="img-photo" src="${curruntItems.original}" alt="${curruntItems.description}" width="1280" height="600" >
`);
  instance.show();

  window.addEventListener('keydown', onKeydown);
  function onKeydown(evt) { 
    if (evt.code === 'Escape') { 
      instance.close();
      window.removeEventListener('keydown', onKeydown); 
    }
  }
}

galery.insertAdjacentHTML('beforeend', markup);
galery.addEventListener('click', onClick);