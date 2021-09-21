import { http } from './http.js';
import { ui } from './ui.js';

// Get products url
const productsUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

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

    }  else if(currentLocation == 'http://localhost:5000/admin') {

    }  else {
        
    }
}
