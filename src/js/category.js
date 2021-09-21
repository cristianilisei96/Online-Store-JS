import { http } from './http.js';
import { ui } from './ui.js';

// Get category product URL
let categoryParamSearch = window.location.search;
const searchParam = new URLSearchParams(categoryParamSearch).get('filter');
const categoryFilterURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=' + searchParam;

// Get location on app
let currentLocation = window.location;

if(currentLocation.href.indexOf(searchParam) != -1) {

    http.get(categoryFilterURL).then((products) => ui.showProductsToUsers(products));

    if(searchParam === 'mac') {
        document.getElementById('link-sidebar-mac-filter').classList.add('bg-success');
    } else if(searchParam === 'iphone') {
        document.getElementById('link-sidebar-iphone-filter').classList.add('bg-success');
    } else if(searchParam === 'ipad') {
        document.getElementById('link-sidebar-ipad-filter').classList.add('bg-success');
    } else if(searchParam === 'watch') {
        document.getElementById('link-sidebar-watch-filter').classList.add('bg-success');
    } else if(searchParam === 'tv') {
        document.getElementById('link-sidebar-tv-filter').classList.add('bg-success');
    } else if(searchParam === 'music') {
        document.getElementById('link-sidebar-music-filter').classList.add('bg-success');
    } else if(searchParam === 'accessories') {
        document.getElementById('link-sidebar-accessories-filter').classList.add('bg-success');
    }
    
} else {}