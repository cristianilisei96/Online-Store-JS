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

// function back to top
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

// Script to redirect after type search bar and submit
let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');

searchInput.addEventListener('keyup', pressEnterBtn);

function pressEnterBtn(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    searchProducts();
  }
}

searchBtn.addEventListener('click', searchProducts);

function searchProducts() {
    window.location = 'search?search=' + searchInput.value;
}

// Notifications script
function notify(nameEvent, type, message) {
  if(type == "success" && nameEvent == "productAddedToCart") {
    var prefix = '<i class="fas fa-cart-plus"></i> ';
  } else if(type == "warning" && nameEvent == "scrollToTop") {
    var prefix = '<i class="fas fa-arrow-up"></i> ';
  }  else if(type == "danger") {
    var prefix = '<i class="ion-close-circled"></i> ';
  } else if(type == "info") {
    var prefix = '<i class="ion-information-circled"></i> ';
  } else if(type == "warning") {
    var prefix = '<i class="ion-alert-circled"></i> ';
  } else {
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
  }
);
}