import { http } from './http.js';
import { ui } from './ui.js';

// Get details of product selected
let searchParamString = window.location.search;
const searchParam = new URLSearchParams(searchParamString).get('id');
const detailsProductUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + searchParam;

http.get(detailsProductUrl).then((product) => ui.showProductDetails(product));

let getIndexOfCurrentItemArrayUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products';
fetch(getIndexOfCurrentItemArrayUrl)
    .then((response) => response.json())
    .then((products) => {
        showElem(products, 1);
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

        console.log('Current index is : ' + currentIndex);
        console.log('Current position is : ' + currentPosition);

        if (index == 0) { 
            prevBtnHTML.disabled = true; 
        }
        if (index == products.length - 1) { 
            nextBtnHTML.disabled = true; 
        }      
    
        nextBtnHTML.addEventListener('click', function() {
            let current = this;
            nextElem(products, index, current);
            window.location.href = window.location + '/details?id=' + ++currentPosition;
        });
        
        prevBtnHTML.addEventListener('click', function() {
            let current = this;
            prevElem(products, index, current);
            window.location.href = "/details?id=" + (--currentPosition);
        });
    } else {
      index = `${index}`;
      showElem(products, index);
    }   
}
  
function nextElem(products, index, current) {
    // let currentElem = current.parentElement;
    index++;
    showElem(products, index);
}
  
function prevElem(products, index, current) {
    let currentElem = current.parentElement;
    index--;
    showElem(products, index);
}