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
  } else if(type == 'success' && nameEvent == 'addProductToJSON') {
    var prefix = '<i class="fas fa-cart-plus"></i> '; 
  }else if(type == 'danger' && nameEvent == "deleteProductFromJSON") {
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
  let idProduct = e.target.id;
  console.log(idProduct);
  if(e.target.classList.contains('addToCartBtn')) {
    notify('productAddedToCart','success', 'Product added to cart');

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
          }
        }

        if(!exists)	
        { 
          array.push(data)
        };

        localStorage.setItem('cart', JSON.stringify(array));
        changeNumberOfProductsInCart();
    });
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
})