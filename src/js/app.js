import { http } from './http.js';
import { ui } from './ui.js';

// Get products url
const productsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';
const macProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=mac';
const iphoneProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=iphone';
const ipadProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=ipad';
const watchProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=watch';
const tvProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=tv';
const musicProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=music';
const accessoriesProductsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?category=accessories';

// Get product from api
document.addEventListener('DOMContentLoaded', getProducts);

// Get location on app
let currentLocation = window.location;

function getProducts() {

    if(currentLocation == 'http://localhost:5000/'){
    
        http.get(productsUrl).then((products) => ui.showProductsToUsers(products));
    
    } else if(currentLocation == 'http://localhost:5000/cart'){
        
        http.get(productsUrl).then((products) => ui.showCartToUser(products));
        console.log('cart page');

    } else if(currentLocation == 'http://localhost:5000/category?filter=mac'){
        
        http.get(macProductsUrl).then((products) => ui.showProductsToUsers(products));

        document.getElementById('link-sidebar-mac-filter').classList.add('bg-success');
    
    } else if(currentLocation == 'http://localhost:5000/category?filter=iphone'){
        
        http.get(iphoneProductsUrl).then((products) => ui.showProductsToUsers(products));
        document.getElementById('link-sidebar-iphone-filter').classList.add('bg-success');
    
    } else if(currentLocation == 'http://localhost:5000/category?filter=ipad'){
        
        http.get(ipadProductsUrl).then((products) => ui.showProductsToUsers(products));
        document.getElementById('link-sidebar-ipad-filter').classList.add('bg-success');
    
    } else if(currentLocation == 'http://localhost:5000/category?filter=watch'){
        
        http.get(watchProductsUrl).then((products) => ui.showProductsToUsers(products));
        document.getElementById('link-sidebar-watch-filter').classList.add('bg-success');
    
    } else if(currentLocation == 'http://localhost:5000/category?filter=tv'){
        
        http.get(tvProductsUrl).then((products) => ui.showProductsToUsers(products));
        document.getElementById('link-sidebar-tv-filter').classList.add('bg-success');
    
    } else if(currentLocation == 'http://localhost:5000/category?filter=music'){
        
        http.get(musicProductsUrl).then((products) => ui.showProductsToUsers(products));
        document.getElementById('link-sidebar-music-filter').classList.add('bg-success');
    
    } else if(currentLocation == 'http://localhost:5000/category?filter=accessories'){
        
        http.get(accessoriesProductsUrl).then((products) => ui.showProductsToUsers(products));
        document.getElementById('link-sidebar-accessories-filter').classList.add('bg-success');
    
    } else if(currentLocation == 'http://localhost:5000/admin') {

    }  else {
        
    }
}

// scroll to top script
const btnToTop = document.getElementById('btnToTop');

$(document).scroll(function () {
    if (window.scrollY > 150 ) {
        $(".buttonToTop").css("display", "block");
    } else {
        $(".buttonToTop").css("display", "none");
    }
});
