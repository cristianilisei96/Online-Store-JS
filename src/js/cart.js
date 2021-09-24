import { http } from './http.js';
import { ui } from './ui.js';

let itemsCart = document.getElementById('itemsCart');
let tbodyProductsInCart = document.getElementById('tbodyProductsInCart');
let cardShoppingCart = document.getElementById('cardShoppingCart');
var cartContentStored = localStorage.getItem('cart');
var productsOnCartStored = JSON.parse(cartContentStored);

if(localStorage.getItem('cart')){
    // alert('avem produse');
    notify('infoAlertProductsInCart', 'info', 'You have products in the cart');
    
    let output = '';
    productsOnCartStored.forEach(product => {
        output += 
            `<tr>
                <th>
                    <img src="${product.image}" class="img-sm">
                </th>
                <td>
                    <h6>${product.name}</h6>
                </td>
                <td> 
                    <input type="number" value="${product.quantity}" class="form-control" />
                </td>
                <td>
                    <div class="price-wrap"> 
                        <var class="price">$${product.price}</var> 
                    </div>
                </td>
                <td class="text-end"> 
                    <button id="${product.id}" type="button" class="btn btn-danger" data-abc="true">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </td>
            </tr>`;
        tbodyProductsInCart.innerHTML = output;
    });

} else {
    notify('infoAlertProductsInCart', 'info', 'You haven\'t items in your shopping cart');
    let output = '';
    
        output += 
            `<h4 class="m-0">I did not find any product in your cart</h4>`;
        cardShoppingCart.innerHTML = output;
}

const continueShoppingBtn = document.getElementById('continueShoppingBtn');
continueShoppingBtn.addEventListener('click', goToHome);