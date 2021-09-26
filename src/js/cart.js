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

// Get spinner load container
let loadingSpinner = document.getElementById("loadingSpinner");
loadingSpinner.removeAttribute("hidden");

function checkCartLocalStorage(){
    if(cartContentStored === '[]'){
        clearCartFunction();
        loadingSpinner.setAttribute("hidden","");
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
                            <h6>${product.name}</h6>
                        </a>
                    </td>
                    <td style="width: 150px; display: block;"> 
                        <div class="input-group">
                            <span class="input-group-btn">
                                <button value="${product.id}" type="button" class="btn btn-success qtMinusOne">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </span>
                            <input type="text" value="${product.quantity}" class="form-control quantityOfItem text-center" disabled/>
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
        loadingSpinner.setAttribute("hidden","");
    } else {
        clearCartBtn.disabled = true;
        let output = '';
            output += 
                `<h4 class="m-0">I did not find any product in your cart</h4>`;
            cardShoppingCart.innerHTML = output;
        loadingSpinner.setAttribute("hidden","");
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
                array[i].quantity -= 1;
                if(array[i].quantity == 0){
                    array.splice(i,1);
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
                array[i].quantity -= 1;
                // console.log(array[i].quantity);
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
    const increaseItemBtn = e.target.classList.contains('qtPlusOne'); 
    const increaseItemIcon = e.target.parentElement.parentElement;
    
    if(increaseItemBtn) {
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
                array[i].quantity += 1;
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
                array[i].quantity += 1;
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } 
}

tbodyProductsInCart.addEventListener('click', removeProductFromCart);

function removeProductFromCart(e){
    const removeProductBtn = e.target.classList.contains('removeProduct'); 
    const removeProductSVG = e.target.parentElement.tagName == 'BUTTON';
    const removePathBtn = e.target.parentElement.parentElement.tagName == 'BUTTON';

    if(removeProductBtn){
        console.log('BTN pressed');
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
                array.splice(i,1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(array));
        window.location.reload();
    } else if(removeProductSVG) {
        console.log('SVG pressed');
        console.log(removeProductSVG.property);
    } else if(removePathBtn){
        console.log('Path pressed');
    } else {
        console.log(e.target);
    }

    const idOfItemRemoved = e.target.value;
    
    // console.log(idOfItemRemoved);

        // if(localStorage.getItem('cart'))
        // {  
        // var array = JSON.parse(localStorage.getItem('cart'));
        // } else {
        // var array = []; 
        // }

        // for(let i = 0; i < array.length; ++i) {
        //     if(array[i].id === idOfItemRemoved)
        //     { 
                
                
        //     }
        // }

        // localStorage.setItem('cart', JSON.stringify(array));
        // window.location.reload();
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