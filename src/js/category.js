import { http } from './http.js';
import { ui } from './ui.js';

// Get category products URL
const macProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=mac';
const iphoneProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=iphone';
const ipadProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=ipad';
const watchProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=watch';
const tvProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=tv';
const musicProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=music';
const accessoriesProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=accessories';

// Get details of product selected
let categoryParamSearch = window.location.search;
const searchParam = new URLSearchParams(categoryParamSearch).get('filter');
const detailsProductUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=' + searchParam;
console.log('DetailsProductUrl is ' + detailsProductUrl);
console.log('SearchParam is ' + searchParam);
console.log('CategoryParamSearch is ' + categoryParamSearch);
// http.get(detailsProductUrl).then((product) => ui.showProductDetails(product));

// Get location on app
let currentLocation = window.location;
console.log('CurrentLocation is ' + currentLocation);

const categoryFilterURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=' + searchParam;

if(window.location.href.indexOf(searchParam) != -1) {
    console.log('true');

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
    
} else {
    console.log('false');
}

// if(currentLocation == 'http://localhost:5000/category?filter=mac'){
    
//     http.get(macProductsUrl).then((products) => ui.showProductsToUsers(products));

//     document.getElementById('link-sidebar-mac-filter').classList.add('bg-success');

// } else if(currentLocation == 'http://localhost:5000/category?filter=iphone'){
    
//     http.get(iphoneProductsUrl).then((products) => ui.showProductsToUsers(products));
//     document.getElementById('link-sidebar-iphone-filter').classList.add('bg-success');

// } else if(currentLocation == 'http://localhost:5000/category?filter=ipad'){
    
//     http.get(ipadProductsUrl).then((products) => ui.showProductsToUsers(products));
//     document.getElementById('link-sidebar-ipad-filter').classList.add('bg-success');

// } else if(currentLocation == 'http://localhost:5000/category?filter=watch'){
    
//     http.get(watchProductsUrl).then((products) => ui.showProductsToUsers(products));
//     document.getElementById('link-sidebar-watch-filter').classList.add('bg-success');

// } else if(currentLocation == 'http://localhost:5000/category?filter=tv'){
    
//     http.get(tvProductsUrl).then((products) => ui.showProductsToUsers(products));
//     document.getElementById('link-sidebar-tv-filter').classList.add('bg-success');

// } else if(currentLocation == 'http://localhost:5000/category?filter=music'){
    
//     http.get(musicProductsUrl).then((products) => ui.showProductsToUsers(products));
//     document.getElementById('link-sidebar-music-filter').classList.add('bg-success');

// } else if(currentLocation == 'http://localhost:5000/category?filter=accessories'){
    
//     http.get(accessoriesProductsUrl).then((products) => ui.showProductsToUsers(products));
//     document.getElementById('link-sidebar-accessories-filter').classList.add('bg-success');

// } else {}