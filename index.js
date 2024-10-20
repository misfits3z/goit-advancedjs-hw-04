import{a as p,i as f,S as q}from"./assets/vendor-Rdv7LHNr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();p.defaults.baseURL="https://pixabay.com/api/";const v="46457503-330abda4e6a20c9fb19d2e08a";let d=1;async function g(r,t=!1){t&&(d=1);try{const a=(await p("",{params:{key:v,q:r,page:d,per_page:200}})).data;return a.totalHits>0?(d+=1,a.hits):(f.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3,color:"#FF0000",messageColor:"#FFFFFF"}),[])}catch(s){return console.log(s),[]}}const m=r=>r.map(({largeImageURL:t,webformatURL:s,tags:a,likes:e,views:o,comments:l,downloads:S})=>`<li class="gallery-item">
        <a class="gallery-link" href="${t}">
          <img
            class="gallery-image"
            src="${s}"
            alt="${a}"
          />
        </a>
        <div class="gallery-info">
          <p><b>Likes:</b> ${e}</p>
          <p><b>Views:</b> ${o}</p>
          <p><b>Comments:</b> ${l}</p>
          <p><b>Downloads:</b> ${S}</p>
        </div>
      </li>`).join(""),h=()=>{new q(".gallery .gallery-item a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300}).refresh()},b=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),n=document.querySelector(".btn"),i=document.querySelector(".loader");let y="",F=1,L=0,c=0;n.style.display="none";b.addEventListener("submit",$);async function $(r){r.preventDefault(),y=r.currentTarget.elements.user_query.value.trim(),u.innerHTML="",i.style.display="block",n.style.display="none",F=1,c=0;try{const t=await g(y,!0);if(t.length>0){L=t.totalHits,c+=t.length;const s=m(t);u.insertAdjacentHTML("beforeend",s),h(),n.style.display="block"}}catch(t){console.log(t)}finally{i.style.display="none",b.reset()}}n.addEventListener("click",w);async function w(){i.style.display="block";try{F+=1;const r=await g(y,!1);if(r.length>0){c+=r.length;const t=m(r);u.insertAdjacentHTML("beforeend",t),h()}c>=L&&(n.style.display="none",f.error({message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:2e3,color:"lightblue",messageColor:"#FFFFFF"}))}catch(r){console.log(r)}finally{i.style.display="none"}}
//# sourceMappingURL=index.js.map
