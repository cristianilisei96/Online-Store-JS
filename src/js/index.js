import { http } from './http.js';
import { ui } from './ui.js';

const productsURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

//Get product from api
document.addEventListener('DOMContentLoaded', getProducts());

function getProducts() {
	http.get(productsURL).then((products) => {ui.showProductsToUsers(products)});
}

// Script cart - add product to localstorage


document.getElementById('products-items-list').addEventListener('click', addToCartFunction);

function addToCartFunction(e) {
  	let addToCartBtns = e.target;
	let idProduct = e.target.id;

	if(e.target.classList.contains('addToCartBtn')) {
		notify('productAddedToCart','success', 'Product added to cart');

		let urlFetchProductToCart = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;
		
		fetch(urlFetchProductToCart)
			.then((response) => response.json())
			.then(data => {

				if(localStorage.getItem('cart'))
				{  
					var array = JSON.parse(localStorage.getItem('cart'));
				} else {
					var array = []; 
				}

				let exists = false;
				for(let i=0;i<array.length;++i)
				if(array[i].id === data.id)
				{ exists= true; array[i].quantity += 1;}

				if(!exists) array.push(data)

				localStorage.setItem('cart', JSON.stringify(array));

				changeNumberOfProductsInCart();

			});
  	} else {}
}