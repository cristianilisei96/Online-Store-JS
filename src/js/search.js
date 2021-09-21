let searchInput = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', searchProducts);

function searchProducts() {
    window.location = 'search?search=' + searchInput.value;
    console.log(searchInput.value);

    let searchInputValueProductUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products?search=' + searchInput.value;
    console.log(searchInputValueProductUrl);

    http.get(searchInputValueProductUrl).then((products) => ui.showSearchResult(products));
}