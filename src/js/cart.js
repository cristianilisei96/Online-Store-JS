import { http } from './http.js';
import { ui } from './ui.js';

// const addToCartBtns = document.getElementsByClassName('addToCartBtns');
// console.log(addToCartBtns);

// for(let i = 0; i < addToCartBtns.length; i++){
// 	let cartBtn = addToCartBtns[i];
// 	cartBtn.addEventListener('click', () => {
// 		console.log('event target is ', event.target);
// 		alert('merge');
// 	})
// }

// document.getElementById('products-items-list').addEventListener('click', addToCartFunction);

// function addToCartFunction(e) {
// 	// console.log(e.target);
// 	let addToCartBtns = e.target;
// 	let idProduct = e.target.id;

// 	console.log('Add cart btn is : ' + addToCartBtns);
// 	console.log('Product id is : ' + idProduct);

// 	let cart = [];

// 	let urlFetchProductToCart = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;
// 		// console.log(urlFetchProductToCart);
// 		fetch(urlFetchProductToCart)
// 			.then((response) => response.json())
// 			.then(data => {
// 				console.log(data);
// 				cart.push(data);
// 				console.log(cart);

// 				if(localStorage.getItem('cart'))
// 					{  
// 						array = JSON.parse(localStorage.getItem('cart')) 
// 					} else {
// 						var array = []; 
// 					}
						
// 						array.push(data);
					
// 					localStorage.setItem('cart',JSON.stringify(array));

// 			});
		
// 		console.log('cart is : ', cart);
// }