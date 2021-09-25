import { http } from './http.js';
import { ui } from './ui.js';

let itemsCart = document.getElementById('itemsCart');
let tbodyProductsInCart = document.getElementById('tbodyProductsInCart');
let cardShoppingCart = document.getElementById('cardShoppingCart');
var cartContentStored = localStorage.getItem('cart');
var productsOnCartStored = JSON.parse(cartContentStored);

function checkCartLocalStorage(){
    if(cartContentStored){        
        let output = '';
        productsOnCartStored.forEach(product => {
            output += 
                `<tr class="align-middle">
                    <td>
                        <a href="details?id=${product.id}">
                            <img src="${product.image}" class="img-sm">
                        </a>
                    </td>
                    <td>
                        <a href="details?id=${product.id}">
                            <h6>${product.name}</h6>
                        </a>
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
                        <button value="${product.id}" type="button" class="btn btn-danger removeProduct">
                            <i value="${product.id}" class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
            tbodyProductsInCart.innerHTML = output;
        });
    } else {
        let output = '';
            output += 
                `<h4 class="m-0">I did not find any product in your cart</h4>`;
            cardShoppingCart.innerHTML = output;
    }
}

checkCartLocalStorage();

tbodyProductsInCart.addEventListener('click', removeLocallyStoredProduct);

function removeLocallyStoredProduct(e) {
    const removeItemBtn = e.target.classList.contains('removeProduct'); 
    const removeItemIcon = e.target.parentElement;
    
    if(removeItemBtn) {
        const idOfItemRemoved = e.target.value;
        
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }

        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemRemoved)
            { 
                let exists= true; 
                array[i].quantity -= 1;
                if(array[i].quantity == 0){
                    
                }
            }
        }

        localStorage.setItem('cart', JSON.stringify(array));
    } else if(removeItemIcon) {
        
    } else {}
    window.location.reload();
}

const makePurchaseBtn = document.getElementById('makePurchaseBtn');
makePurchaseBtn.addEventListener('click', removeLocalStorage);

const continueShoppingBtn = document.getElementById('continueShoppingBtn');
continueShoppingBtn.addEventListener('click', goToHome);

const clearCartBtn = document.getElementById('clearCartBtn');
clearCartBtn.addEventListener('click', clearCartFunction);