import { http } from './http.js';
import { ui } from './ui.js';

let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');
let searchParamSpan = document.getElementById('searchParamSpan');

// Get category product URL
let categoryParamSearch = window.location.search;
const searchParam = new URLSearchParams(categoryParamSearch).get('search');
const categoryFilterURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?search=' + searchParam;

console.log(categoryFilterURL);

searchParamSpan.innerHTML = searchParam;

// Get location on app
let currentLocation = window.location;
console.log(currentLocation);

searchBtn.addEventListener('click', searchProducts);

function searchProducts(e) {
    window.location = 'search?search=' + searchInput.value;
    // console.log(searchInput.value);
    console.log(categoryFilterURL);
}

http.get(categoryFilterURL).then((products) => ui.showSearchResult(products));