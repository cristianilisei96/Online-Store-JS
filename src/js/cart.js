import { http } from './http.js';
import { ui } from './ui.js';

let itemsCart = document.getElementById('itemsCart');
let tbodyProductsInCart = document.getElementById('tbodyProductsInCart');
let cardShoppingCart = document.getElementById('cardShoppingCart');
var cartContentStored = localStorage.getItem('cart');
var productsOnCartStored = JSON.parse(cartContentStored);
let testContainer = document.getElementById('testContainer');

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
                    <td id=""> 
                        <div class="input-group w-50">
                            <span class="input-group-btn">
                                <button value="${product.id}" type="button" class="btn btn-success qtMinusOne">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </span>
                            <input type="number" value="${product.quantity}" class="form-control quantityOfItem text-center" disabled/>
                            <span class="input-group-btn">
                                <button value="${product.id}" type="button" class="btn btn-default btn-success qtPlusOne">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="price-wrap"> 
                            <p class="priceOfItem m-0 fw-bold color-default">$${product.price}</p> 
                        </div>
                    </td>
                    <td  class="text-end"> 
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

tbodyProductsInCart.addEventListener('click', decreaseProductQuantity);

function decreaseProductQuantity(e) {
    const decreaseItemBtn = e.target.classList.contains('qtMinusOne'); 
    const decreaseItemIcon = e.target.parentElement.parentElement;
    
    if(decreaseItemBtn) {
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
                    // const existingEntries = JSON.parse(localStorage.getItem("allCars"));
                    // existingEntries.splice(index, 1);
                    // localStorage.setItem("allCars", JSON.stringify(existingEntries));
                }
            }
        }

        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(decreaseItemIcon.classList.contains('qtMinusOne')){
        const idOfItemRemoved = e.target.parentElement.parentElement.value;
        
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
        window.location.reload();
    }    
}

tbodyProductsInCart.addEventListener('click', increaseProductQuantity);

function increaseProductQuantity(e) {
    const increaseItemBbtn = e.target.classList.contains('qtPlusOne'); 
    const increaseItemIcon = e.target.parentElement.parentElement;
    
    if(increaseItemBbtn) {
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
                array[i].quantity += 1;
                if(array[i].quantity == 0){
                    
                }
            }
        }

        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(increaseItemIcon.classList.contains('qtPlusOne')){
        const idOfItemRemoved = e.target.parentElement.parentElement.value;
        
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
                array[i].quantity += 1;
                if(array[i].quantity == 0){
                    
                }
            }
        }

        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } 
}

tbodyProductsInCart.addEventListener('click', removeProductFromCart);

function removeProductFromCart(e){
    const removeProductBtn = e.target.classList.contains('removeProduct'); 
    const increaseItemIcon = e.target.parentElement.parentElement;
    
    
}

const totalPriceValue = document.getElementById('totalPriceValue');
// console.log(totalPriceValue);

const totalValue = document.getElementById('totalValue');
// console.log(totalValue);

function updateCheckout(){
    let checkoutTotalPrice = 0;
    
    let quantityOfItems = document.querySelectorAll('.quantityOfItem');
    let priceOfItems = document.querySelectorAll('.priceOfItem');
    console.log(quantityOfItems);
    console.log(typeof priceOfItems);

    quantityOfItems.forEach(item => {
        console.log(item.value);
    });
    priceOfItems.forEach(item => {
        console.log(item.innerHTML);
    });

    if(cartContentStored){  
        totalPriceValue.innerHTML = 'ceva';
        totalValue.innerHTML = 'ceva2';
    } else {
        totalPriceValue.innerHTML = '$0';
        totalValue.innerHTML = '$0';
    }
}

updateCheckout();

const continueShoppingBtn = document.getElementById('continueShoppingBtn');
continueShoppingBtn.addEventListener('click', goToHome);

const clearCartBtn = document.getElementById('clearCartBtn');
clearCartBtn.addEventListener('click', clearCartFunction);

function clearCartFunction(){
    localStorage.removeItem('cart');
    window.location.reload();
}