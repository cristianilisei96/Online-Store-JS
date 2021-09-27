// Get button back to top from html
const btnToTop = document.getElementById('btnToTop');

// Show button back to top over 150
$(document).scroll(function () {
    if (window.scrollY > 150 ) {
        $(".buttonToTop").css("display", "block");
    } else {
        $(".buttonToTop").css("display", "none");
    }
});

// Function back to top
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

// Notifications script
function notify(nameEvent, type, message) {
  if(type == "success" && nameEvent == "productAddedToCart") {
    var prefix = '<i class="fas fa-cart-plus"></i> ';
  } else if(type == 'success' && nameEvent == 'loginSuccessfully') {
    var prefix = '<i class="fas fa-thumbs-up"></i> '; 
  } else if(type == 'danger' && nameEvent == 'inputFieldFailed') {
    var prefix = '<i class="fas fa-exclamation-circle"></i> '; 
  } else if(type == 'success' && nameEvent == 'addProductToJSON') {
    var prefix = '<i class="fas fa-cart-plus"></i> '; 
  } else if(type == 'danger' && nameEvent == "deleteProductFromJSON") {
    var prefix = '<i class="fas fa-info-circle"></i> ';
  } 
  else {
    var prefix = '';
  }

  $.notify(
    {
      message: prefix + message,
    },
  {
  type: type,
  newest_on_top: false,
  allow_dismiss: true,
  mouse_over: "pause",
  placement: {
        from: "top",
        align: "center"
      },
  });
}

// Script to redirect after type search bar and submit
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');

searchInput.addEventListener('keyup', pressEnterBtn);
searchBtn.addEventListener('click', searchProducts);

function pressEnterBtn(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    searchProducts();
  }
}

function searchProducts() {
    window.location = 'search?search=' + searchInput.value;
}

// Script get products from localstorage and add to icon cart navlink
function changeNumberOfProductsInCart(){
	let cartItemsNumber = document.getElementById('cartItemsNumber');
	let cartLocalStorage = localStorage.getItem('cart');
	
	if(cartLocalStorage) {
		let parseCartLocalStorage = JSON.parse(cartLocalStorage) ;
		cartItemsNumber.textContent = parseCartLocalStorage.length;
	} else {
		cartItemsNumber.textContent = 0;
	}

}

changeNumberOfProductsInCart();

// Script add product to cart
function addToCartFunction(e) {
  const eventTargetOnBtn = e.target.classList.contains('addToCartBtn');
  const eventTargetOnSVG = e.target.classList.contains('addToCartIcon');
  const eventTargetOnPath = e.target.tagName === 'path';

  if(eventTargetOnBtn) {
    notify('productAddedToCart','success', 'Product added to cart');

    let idProduct = e.target.id;
    let urlFetchProductToCart = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;
  
    fetch(urlFetchProductToCart)
      .then((response) => response.json())
      .then(data => {
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }

        let exists = false;
        for(let i=0;i<array.length;++i) {
          if(array[i].id === data.id)
          { 
            exists= true; 
            array[i].quantity += 1;
            array[i].totalPrice = array[i].quantity * array[i].price;
          }
        }

        if(!exists)	
        { 
          array.push(data)
        };

        localStorage.setItem('cart', JSON.stringify(array));
        changeNumberOfProductsInCart();
    });
  } else if(eventTargetOnSVG){
    notify('productAddedToCart','success', 'Product added to cart');

    let idProduct = e.target.parentElement.id;
    let urlFetchProductToCart = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;

    fetch(urlFetchProductToCart)
      .then((response) => response.json())
      .then(data => {
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }

        let exists = false;
        for(let i = 0; i < array.length; ++i) {
          if(array[i].id === data.id)
          { 
            exists= true; 
            array[i].quantity += 1;
            array[i].totalPrice = array[i].quantity * array[i].price;
          }
        }

        if(!exists)	
        { 
          array.push(data)
        };

        localStorage.setItem('cart', JSON.stringify(array));
        changeNumberOfProductsInCart();
    });
  } else if(eventTargetOnPath){
    notify('productAddedToCart','success', 'Product added to cart');

    let idProduct = e.target.parentElement.parentElement.id;
    let urlFetchProductToCart = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;

    fetch(urlFetchProductToCart)
      .then((response) => response.json())
      .then(data => {
        if(localStorage.getItem('cart'))
        {  
          var array = JSON.parse(localStorage.getItem('cart'));
        } else {
          var array = []; 
        }

        let exists = false;
        for(let i = 0; i < array.length; ++i) {
          if(array[i].id === data.id)
          { 
            exists= true; 
            array[i].quantity += 1;
            array[i].totalPrice = array[i].quantity * array[i].price;
          }
        }

        if(!exists)	
        { 
          array.push(data)
        };

        localStorage.setItem('cart', JSON.stringify(array));
        changeNumberOfProductsInCart();
    });

    console.log('ai apasat pe path');
    console.log();
  }
}

// Remove item from localStorage
function removeItemFromLocalStorage(){
  
}

// Script to redirect to home page
function goToHome(){
  window.location.href = "index.html";
}

// Add modals to html pages
$(function(){
  $("#modals").load("modals.html");
});


// Script login local session storage
let localLoginSessionStorage = sessionStorage.getItem('loginSession');
let sessionLoginLink = document.getElementById('sessionLoginLink');

function checkIfItIsALoginSession(){
    if(localLoginSessionStorage) {
        const loginPage = document.getElementById('loginPage');
        const appPage = document.getElementById('appPage');
        const adminNavLink = document.getElementById('adminNavLink');
        let localLoginSessionStorage = sessionStorage.getItem('loginSession');
        let fullnameAdmin = document.getElementById('fullnameAdmin');  
        
        if(window.location.href.indexOf('admin') != -1){
          loginPage.hidden = true;
          appPage.hidden = false;
          fullnameAdmin.innerText = localLoginSessionStorage;
        } else {
          adminNavLink.hidden = true;
          sessionLoginLink.hidden = false;
          fullnameAdmin.innerText = localLoginSessionStorage;
        }
        console.log('este');
    } else {    
        
        if(window.location.href == ''){
          sessionLoginLink.hidden = true;
          fullnameAdmin.innerText = localLoginSessionStorage;
        } else if(window.location.href.indexOf('category') != -1){
          sessionLoginLink.hidden = true;
          fullnameAdmin.innerText = localLoginSessionStorage;
        } else if(window.location.href.indexOf('cart') != -1){
          sessionLoginLink.hidden = true;
        } else if(window.location.href.indexOf('details') != -1){
          sessionLoginLink.hidden = true;
        } else if(window.location.href.indexOf('search') != -1){
          sessionLoginLink.hidden = true;
        } else if(window.location.href.indexOf('admin') != -1){
          sessionLoginLink.hidden = false;
        }
        fullnameAdmin.innerText = localLoginSessionStorage;
        console.log('nu este');
    }
}

checkIfItIsALoginSession();

logoutBtn.addEventListener('click', destroyLoginSession);

function destroyLoginSession(){
    sessionStorage.removeItem('loginSession');
    window.location.reload();
}