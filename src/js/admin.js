import { http } from './http.js';
import { ui } from './ui.js';

const productsAdminURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

document.getElementById('add-product').addEventListener('click', addNewProduct);
document.getElementById('products-container').addEventListener('click', deleteProduct);

http.get(productsAdminURL).then((products) => ui.showProductsToAdmins(products));

function getProducts() {
    http.get(productsAdminURL).then((products) => ui.showProductsToAdmins(products));
}

function addNewProduct() {
    var nameValue = document.getElementById('title').value;
    const imageValue = document.getElementById('image').value;
    const priceValue = Number(document.getElementById('price').value);
    
    const product = {
        name: nameValue,
        image: imageValue,
        price: priceValue,
    };

    http.post(productsAdminURL, product).then(() => getProducts());                    
}

function deleteProduct(e) {
    // console.log(e.target);
    if(e.target.classList.contains('delete')){
        const id = e.target.id;
        http
            .delete(`${productsAdminURL}/${id}`)
            .then(() => getProducts())
            .catch('Error on delete');
    }
}