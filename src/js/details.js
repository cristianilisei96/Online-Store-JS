import { http } from './http.js';
import { ui } from './ui.js';

// Get details of product selected
let searchParamString = window.location.search;
const searchParam = new URLSearchParams(searchParamString).get('id');
const detailsProductUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + searchParam;

http.get(detailsProductUrl).then((product) => ui.showProductDetails(product));

// Get spinner load container
let loadingSpinner = document.getElementById("loadingSpinner");
loadingSpinner.removeAttribute("hidden");

let getIndexOfCurrentItemArrayUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products';
fetch(getIndexOfCurrentItemArrayUrl)
    .then((response) => response.json())
    .then((products) => {
        loadingSpinner.setAttribute("hidden","");
        showElem(products, 0);
    });

function showElem(products, index) {
    
    if (products[index] != undefined) {

        const prevBtnHTML = document.getElementById('prev');
        const nextBtnHTML = document.getElementById('next');

        let index = products.map(function(e) {
            return e.id;
        }).indexOf(searchParam);
      
        let currentIndex = `${index}`;
        let currentPosition = `${index+1}`;

        if (index == 0) { 
            prevBtnHTML.disabled = true; 
        }
        if (index == products.length - 1) { 
            nextBtnHTML.disabled = true; 
        }      
    
        nextBtnHTML.addEventListener('click', function() {
            let current = this;
            nextElem(products, index, current);
            window.location.href = 'details?id=' + ++currentPosition;
        });
        
        prevBtnHTML.addEventListener('click', function() {
            let current = this;
            prevElem(products, index, current);
            window.location.href = "details?id=" + --currentPosition;
        });
    } else {
      index = `${index}`;
      showElem(products, index);
    }   
}
  
function nextElem(products, index, current) {
    index++;
    showElem(products, index);
}
  
function prevElem(products, index, current) {
    index--;
    showElem(products, index);
}