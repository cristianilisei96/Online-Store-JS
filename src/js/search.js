import { http } from './http.js';
import { ui } from './ui.js';

let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');
let searchParamSpan = document.getElementById('searchParamSpan');

// Get category product URL
let categoryParamSearch = window.location.search;
const searchParam = new URLSearchParams(categoryParamSearch).get('search');
const categoryFilterURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?search=' + searchParam;

// Insert to restult span title, the searched Parameter
searchParamSpan.innerHTML = '"' + searchParam + '"';

searchBtn.addEventListener('click', searchProducts);

function searchProducts(e) {
    window.location = 'search?search=' + searchInput.value;
}

http.get(categoryFilterURL)
    .then((products) => {ui.showSearchResult(products)});

// Add eventlistener to btn to add product to cart
document.getElementById('products-container').addEventListener('click', addToCartFunction);
