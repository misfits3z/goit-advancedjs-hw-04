import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/'
const API_KEY = '46457503-330abda4e6a20c9fb19d2e08a';

let page = 1;

async function getPhotos(query, resetPage = false) {
    if (resetPage) {
        page = 1;
    }

    try {
        const response = await axios('', {
            params: {
                key: API_KEY, 
                q: query,        
                page: page,      
                per_page: 200,    
            }
        });

        const data = response.data

    
        if (data.totalHits > 0) {
            page += 1; 
            return data.hits; 
        } else {
            iziToast.error({
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: "topRight",
                timeout: 2000,
                color: "#FF0000",
                messageColor: "#FFFFFF",
            });
            return []; 
        }
    } catch (err) {
        console.log(err);
        
        return []; 
        
    }
}
 
// const BASE_URL = 'https://pixabay.com/api/' ;
// const API_KEY = '46457503-330abda4e6a20c9fb19d2e08a';

// function getPhotos(query){

//     return fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`).then((response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       }).then( data => {
//         if (data.totalHits > 0) {
//           return data.hits;
//         } else {
        //   iziToast.error({
        //     message: `Sorry, there are no images matching your search query. Please try again!`,
        //     position: "topRight", 
        //     timeout: 2000,
        //     color: "#FF0000",
        //     messageColor: "#FFFFFF", 
        //   }); 
//         }
//     })    
    
// }

export{getPhotos};