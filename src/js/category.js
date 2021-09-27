import { http } from './http.js';
import { ui } from './ui.js';

// Get title element of local category page
let websiteTitle = document.getElementById('websiteTitle');

// Get category product URL
let categoryParamSearch = window.location.search;
const searchParam = new URLSearchParams(categoryParamSearch).get('filter');
const categoryFilterURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=' + searchParam;

// Get location on app
let currentLocation = window.location;

if(currentLocation.href.indexOf(searchParam) != -1) {
    // console.log(currentLocation.href.indexOf(searchParam) != -1);
    http.get(categoryFilterURL).then((products) => ui.showProductsToUsers(products));

    if(searchParam === 'mac') {
        websiteTitle.textContent = 'Mac category - Apple mix';
        document.getElementById('link-sidebar-mac-filter').classList.add('bg-success');
    } else if(searchParam === 'iphone') {
        websiteTitle.textContent = 'iPhone category - Apple mix';
        document.getElementById('link-sidebar-iphone-filter').classList.add('bg-success');
    } else if(searchParam === 'ipad') {
        websiteTitle.textContent = 'iPad category - Apple mix';
        document.getElementById('link-sidebar-ipad-filter').classList.add('bg-success');
    } else if(searchParam === 'watch') {
        websiteTitle.textContent = 'Apple watch category - Apple mix';
        document.getElementById('link-sidebar-watch-filter').classList.add('bg-success');
    } else if(searchParam === 'tv') {
        websiteTitle.textContent = 'Apple TV category - Apple mix';
        document.getElementById('link-sidebar-tv-filter').classList.add('bg-success');
    } else if(searchParam === 'music') {
        websiteTitle.textContent = 'Music category - Apple mix';
        document.getElementById('link-sidebar-music-filter').classList.add('bg-success');
    } else if(searchParam === 'accessories') {
        websiteTitle.textContent = 'Accessories category - Apple mix';
        document.getElementById('link-sidebar-accessories-filter').classList.add('bg-success');
    }
    
}

// Add eventlistener to btn to add product to cart
document.getElementById('products-items-list').addEventListener('click', addToCartFunction);