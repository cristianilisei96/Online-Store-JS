import { http } from './http.js';
import { ui } from './ui.js';

const productsAdminURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

// Get elem from html
const loginPage = document.getElementById('loginPage');
const appPage = document.getElementById('appPage');

const inputs = [
    document.getElementById('emailFieldAdmin'),
    document.getElementById('passwordFieldAdmin')
]

inputs.forEach((input) => {
    input.addEventListener('keydown', handler);
    input.addEventListener('input', handler);
});

function handler(e) {
    if (e.type === 'input') {
        validate(e.target);
    } else {
        submitOnEnterKey(e);
    }
}

function validate(target) {
    const result = checkLength(target);

    if (result) {
        target.classList.remove('is-invalid');
    } else {
        target.classList.add('is-invalid');
    }

    return result;
}

function checkLength(target) {
    return !!target.value;
}

function submitOnEnterKey(e) {
    if (e.keyCode === 13) {
        submitForm(e);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
}

function submitForm(e) {
    const result = inputs.map((input) => validate(input)).every((val) => val);

    e.preventDefault();
}

const emailFieldAdmin = document.getElementById('emailFieldAdmin');
const passwordFieldAdmin = document.getElementById('passwordFieldAdmin');
const loginBtn = document.getElementById('loginBtn');

var objAdmin = [
    {
        email: "cristianilisei96@gmail.com",
        password: "Admin1"
    }, 
    {
        email: "admin@gmail.com",
        password: "Admin2"
    }
];

loginBtn.addEventListener('click', (e) => {
    var email = emailFieldAdmin.value;
    var password = passwordFieldAdmin.value;
    const result = inputs.map((input) => validate(input)).every((val) => val);
    
    e.preventDefault();
    for(let i = 0; i < objAdmin.length; i++) {
        if( email == objAdmin[i].email && password == objAdmin[i].password ){
            loginPage.classList.add('d-none');
            appPage.classList.add('d-block');
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