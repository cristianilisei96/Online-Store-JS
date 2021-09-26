import { http } from './http.js';
import { ui } from './ui.js';

let tbodyProductsInCart = document.getElementById('tbodyProductsInCart');
let cardShoppingCart = document.getElementById('cardShoppingCart');
var cartContentStored = localStorage.getItem('cart');
var productsOnCartStored = JSON.parse(cartContentStored);

// Get buttons from checkout
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
continueShoppingBtn.addEventListener('click', goToHome);
const clearCartBtn = document.getElementById('clearCartBtn');

function checkCartLocalStorage(){
    if(cartContentStored === '[]'){
        clearCartFunction();
    } else if(cartContentStored){        
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
                            <h6 class="m-0">${product.name}</h6>
                        </a>
                    </td>
                    <td> 
                        <div class="input-group" style="width:130px;">
                            <span class="input-group-btn">
                                <button value="${product.id}" type="button" class="btn btn-success qtProductMinusOneBtn">
                                    <i class="fas fa-minus qtProductMinusOneIcon"></i>
                                </button>
                            </span>
                            <input type="text" value="${product.quantity}" class="form-control quantityOfItem text-center" disabled/>
                            <span class="input-group-btn">
                                <button value="${product.id}" type="button" class="btn btn-success qtProductPlusOneBtn">
                                    <i class="fas fa-plus qtProductPlusOneIcon"></i>
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
                        <button value="${product.id}" type="button" class="btn btn-danger removeProductBtn">
                            <i value="${product.id}" class="fas fa-trash removeProductIcon"></i>
                        </button>
                    </td>
                </tr>`;
            tbodyProductsInCart.innerHTML = output;
        });
    } else {
        clearCartBtn.disabled = true;
        let output = '';
            output += 
                `<h4 class="m-0">I did not find any product in your cart</h4>`;
            cardShoppingCart.innerHTML = output;
    }
}

checkCartLocalStorage();

tbodyProductsInCart.addEventListener('click', decreaseProductQuantity);

function decreaseProductQuantity(e) {
    const eventTargetOnBtn = e.target.classList.contains('qtProductMinusOneBtn');
    const eventTargetOnSVG = e.target.classList.contains('qtProductMinusOneIcon');
    const eventTargetOnPath = e.target.parentElement.parentElement.classList.contains('qtProductMinusOneBtn');

    if(eventTargetOnBtn) {
        const idOfItemToBeDecreased = e.target.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeDecreased)
            {  
                array[i].quantity -= 1;
                if(array[i].quantity == 0){
                    array.splice(i,1);
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(eventTargetOnSVG){
        const idOfItemToBeDecreased = e.target.parentElement.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeDecreased)
            {  
                array[i].quantity -= 1;
                if(array[i].quantity == 0){
                    array.splice(i,1);
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(eventTargetOnPath){
        const idOfItemToBeDecreased = e.target.parentElement.parentElement.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeDecreased)
            {  
                array[i].quantity -= 1;
                if(array[i].quantity == 0){
                    array.splice(i,1);
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    }
}

tbodyProductsInCart.addEventListener('click', increaseProductQuantity);

function increaseProductQuantity(e) {
    const eventTargetOnBtn = e.target.classList.contains('qtProductPlusOneBtn');
    const eventTargetOnSVG = e.target.classList.contains('qtProductPlusOneIcon');
    const eventTargetOnPath = e.target.parentElement.parentElement.classList.contains('qtProductPlusOneBtn');

    if(eventTargetOnBtn) {
        const idOfItemToBeIncreased = e.target.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeIncreased)
            {  
                array[i].quantity += 1;
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(eventTargetOnSVG){
        const idOfItemToBeIncreased = e.target.parentElement.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeIncreased)
            {  
                array[i].quantity += 1;
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(eventTargetOnPath){
        const idOfItemToBeIncreased = e.target.parentElement.parentElement.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeIncreased)
            {  
                array[i].quantity += 1;
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    }
}

tbodyProductsInCart.addEventListener('click', removeProductFromCart);

function removeProductFromCart(e){
    const eventTargetOnBtn = e.target.classList.contains('removeProductBtn');
    const eventTargetOnSVG = e.target.classList.contains('removeProductIcon');
    const eventTargetOnPath = e.target.parentElement.parentElement.classList.contains('removeProductBtn');

    if(eventTargetOnBtn){
        const idOfItemToBeRemoved = e.target.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeRemoved)
            {  
                array.splice(i,1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(eventTargetOnSVG) {
        const idOfItemToBeRemoved = e.target.parentElement.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeRemoved)
            {  
                array.splice(i,1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(eventTargetOnPath){
        const idOfItemToBeRemoved = e.target.parentElement.parentElement.value;
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }
        for(let i = 0; i < array.length;++i) {
            if(array[i].id === idOfItemToBeRemoved)
            {  
                array.splice(i,1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } 
}

const totalPriceValue = document.getElementById('totalPriceValue');
const totalValue = document.getElementById('totalValue');

function updateCheckout(){
    let checkoutTotalPrice = 0;
    
    let quantityOfItems = document.querySelectorAll('.quantityOfItem');
    let priceOfItems = document.querySelectorAll('.priceOfItem');
    // console.log(quantityOfItems);
    // console.log(typeof priceOfItems);

    quantityOfItems.forEach(item => {
        // console.log(item.value);
    });
    priceOfItems.forEach(item => {
        // console.log(item.innerHTML);
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

clearCartBtn.addEventListener('click', clearCartFunction);

function clearCartFunction(){
    localStorage.removeItem('cart');
    window.location.reload();
}