import { http } from './http.js';
import { ui } from './ui.js';

// Get details of product selected
let searchParamString = window.location.search;
const searchParam = new URLSearchParams(searchParamString).get('id');
const detailsProductUrl = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + searchParam;

http.get(detailsProductUrl).then((product) => ui.showProductDetails(product));