// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);
const galleryEl = document.querySelector('.gallery');

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const markupForRendering = galleryItems
  .map(({ preview, original, description }) => {
    return `<a class="gallery__item" href="${original}">
				      <img class="gallery__image" src="${preview}" alt="${description}"/>
			      </a>`;
  })
  .join('');

galleryEl.insertAdjacentHTML('beforeend', markupForRendering);

// Прибираємо нижні падінги у img
const imgEl = document.querySelectorAll('.gallery img');

imgEl.forEach(elem => (elem.style.display = 'block'));

// Створюємо галерею Simplelightbox
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
