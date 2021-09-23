import { http } from './http.js';
import { ui } from './ui.js';

const productsURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

//Get product from api
document.addEventListener('DOMContentLoaded', getProducts());

function getProducts() {
	http.get(productsURL).then((products) => {ui.showProductsToUsers(products)});
}

//test notify js
document.getElementById('btnToTop').addEventListener('click', () => {
	notify('scrollToTop','warning', 'You pressed btn to top');
})

// Script cart
// const addToCartBtns = document.getElementsByClassName('addToCartBtn');
// console.log(addToCartBtns);

document.getElementById('products-items-list').addEventListener('click', addToCartFunction);

function addToCartFunction(e) {
  let addToCartBtns = e.target;
	let idProduct = e.target.id;
//   let cartItemsNumber = [];

  // console.log('Add cart btn is : ', addToCartBtns);
	// console.log('Product id is : ' + idProduct);

	console.log(e.target.classList.contains("addToCartBtn"));

  // Condition to show message 'The product has been added to cart'
  if(e.target.classList.contains('addToCartBtn')) {
    // alert('The product has been added to cart');
	notify('productAddedToCart','success', 'Product added to cart');

    let cart = [];

	  let urlFetchProductToCart = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;

    // console.log(urlFetchProductToCart);

		fetch(urlFetchProductToCart)
			.then((response) => response.json())
			.then(data => {
				console.log(data);
				cart.push(data);
				console.log(cart);

				if(localStorage.getItem('cart'))
				{  
					array = JSON.parse(localStorage.getItem('cart'));
				} else {
					var array = []; 
				}
				array.push(data);
				localStorage.setItem('cart', JSON.stringify(array));
				getLocalProductsStorage();
			});
  } else {}
}

function getLocalProductsStorage(){
	let cartItemsNumber = document.getElementById('cartItemsNumber');

	const cartLocalStorage = localStorage.getItem('cart');
	
	if(cartLocalStorage) {
		let test = localStorage.getItem('cart');
		let jsonTest = JSON.parse(test) ;
		cartItemsNumber.textContent = jsonTest.length;
	} else {
		cartItemsNumber.textContent = 0;
	}

}

getLocalProductsStorage();