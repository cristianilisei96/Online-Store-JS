import { http } from './http.js';
import { ui } from './ui.js';

const productsURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

//Get product from api
document.addEventListener('DOMContentLoaded', getProducts());

function getProducts() {
	http.get(productsURL).then((products) => {ui.showProductsToUsers(products)});
}

// Add eventlistener to btn to add product to cart
document.getElementById('products-items-list').addEventListener('click', addToCartFunction);