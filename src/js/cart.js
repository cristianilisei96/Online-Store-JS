import { http } from './http.js';
import { ui } from './ui.js';

let itemsCart = document.getElementById('itemsCart');
let tbodyProductsInCart = document.getElementById('tbodyProductsInCart');
let cardShoppingCart = document.getElementById('cardShoppingCart');
var test = localStorage.getItem('cart');
var test1 = JSON.parse(test);

if(localStorage.getItem('cart')){
    // alert('avem produse');
    notify('infoAlertProductsInCart', 'info', 'You have products in the cart');
    
    let output = '';
    test1.forEach(element => {
        output += `${element.name}`;
        tbodyProductsInCart.innerHTML = output;
    });

} else {
    notify('infoAlertProductsInCart', 'info', 'You haven\'t items in your shopping cart');
    let output = '';
    
        output += 
            `<h4 class="m-0">I did not find any product in your cart</h4>`;
        cardShoppingCart.innerHTML = output;
    
}