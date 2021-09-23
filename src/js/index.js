import { http } from './http.js';
import { ui } from './ui.js';
document.write('<script type="text/javascript" src="./src/js/cart.js" ></script>');

const productsURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

//Get product from api
document.addEventListener('DOMContentLoaded', getProducts());

function getProducts() {
	http.get(productsURL).then((products) => ui.showProductsToUsers(products));
}