import { http } from './http.js';
import { ui } from './ui.js';

const productsAdminURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

// Get elem from html
const loginPage = document.getElementById('loginPage');
const appPage = document.getElementById('appPage');
const emailFieldAdmin = document.getElementById('emailFieldAdmin');
const passwordFieldAdmin = document.getElementById('passwordFieldAdmin');
const loginBtn = document.getElementById('loginBtn');

var objAdmin = [
    {
        email: "cristianilisei96@gmail.com",
        password: "Parolamea1"
    }, 
    {
        email: "admin@gmail.com",
        password: "admin"
    }
];

loginBtn.addEventListener('click', (e) => {
    var email = emailFieldAdmin.value;
    var password = passwordFieldAdmin.value;
    e.preventDefault();
    for(let i = 0; i < objAdmin.length; i++) {
        if( email == objAdmin[i].email && password == objAdmin[i].password ){
            console.log(email + " is logged in!");
            loginPage.classList.add('d-none');
            appPage.classList.add('d-block');
        } else {
            console.log('Try again !');
        }
    }
});

const homepageBtn = document.getElementById('homepageBtn');

homepageBtn.addEventListener('click', () => {
    window.location.href = "index.html";
});

// http.get(productsAdminURL).then((products) => ui.showProductsToAdmins(products));

document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    http.get(productsAdminURL).then((products) => ui.showProductsToAdmins(products));
}

document.getElementById('add-product').addEventListener('click', addNewProduct);
document.getElementById('products-container').addEventListener('click', deleteProduct);

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