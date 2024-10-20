// 46457503-330abda4e6a20c9fb19d2e08a
// https://pixabay.com/api/
import { getPhotos } from "./js/pixabay-api";
import {createGalleryItems, initLightbox} from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMore = document.querySelector('.btn')
const loader = document.querySelector('.loader');

let userQuery = '';
let page = 1;
let totalHits = 0; 
let totalLoadedImages = 0;

loadMore.style.display = 'none';

// getPhotos('flowers').then(console.log).catch(console.error);

searchFormEl.addEventListener("submit", handleSearch)


async function handleSearch(event){
    event.preventDefault();


userQuery = event.currentTarget.elements.user_query.value.trim();

galleryEl.innerHTML = '';


loader.style.display = 'block';

loadMore.style.display = 'none';

page = 1;
totalLoadedImages = 0;

try{
   const data = await getPhotos(userQuery, true);

   if (data.length > 0){
    totalHits = data.totalHits;
    totalLoadedImages += data.length;


    const galleryMarkup = createGalleryItems(data);
    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup); 

    initLightbox();
    loadMore.style.display = 'block';

   }

} catch(err){
    console.log(err);
} finally {
        loader.style.display = 'none';
        searchFormEl.reset();
    }
};


loadMore.addEventListener('click', handleLoad);

async function handleLoad() {
    loader.style.display = 'block'; 

    try {
        page += 1;
        const data = await getPhotos(userQuery, false);

        if (data.length > 0) {
            totalLoadedImages += data.length;


            const galleryMarkup = createGalleryItems(data);
            galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
            
            initLightbox();
        }
        if (totalLoadedImages >= totalHits){
            loadMore.style.display = 'none'
            iziToast.error({
                message: `We're sorry, but you've reached the end of search results`,
                position: "topRight",
                timeout: 2000,
                color: "lightblue",
                messageColor: "#FFFFFF",
            });
        }
    } catch (err) {
        console.log(err);
    } finally {
        loader.style.display = 'none'; 
    }
}



// galleryEl.innerHTML = '';

// const loader = document.querySelector('.loader');
// loader.style.display = 'block';

// getPhotos(userQuery).then(data => {
//     // console.log(data.hits); 
//     const galleryMarkup = createGalleryItems(data);
//     galleryEl.insertAdjacentHTML('beforeend', galleryMarkup); 

//     initLightbox();
//   })
//   .catch(console.error)
//   .finally(() => {
//     loader.style.display = 'none';
//     form.reset();
// });
// }