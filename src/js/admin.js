import { http } from './http.js';
import { ui } from './ui.js';

const productsAdminURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

// Get elem from html
const loginPage = document.getElementById('loginPage');
const appPage = document.getElementById('appPage');
const adminNavLink = document.getElementById('adminNavLink');

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

    if(result) {
        loginPage.classList.add('d-none');
        appPage.classList.add('d-block');
    } else {}

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
        email: "admin@admin.com",
        password: "admin"
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
            notify('loginSuccessfully','success','You have successfully logged in');
            adminNavLink.classList.add('d-none');
        }
    }
});

const homepageBtn = document.getElementById('homepageBtn');

homepageBtn.addEventListener('click', goToHome);

document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    http.get(productsAdminURL).then((products) => ui.showProductsToAdmins(products));
}

document.getElementById('add-product').addEventListener('click', addNewProduct);
document.getElementById('products-container').addEventListener('click', updateProduct);
document.getElementById('products-container').addEventListener('click', deleteProduct);
document.getElementById('description').addEventListener('keypress', checkEnterHasBeenPressed);

function checkEnterHasBeenPressed(e){
    if(e.keyCode == 13 || e.key === 'Enter'){
        $('#addNewProductModal').modal('hide');  
        addNewProduct();
    }
}

function addNewProduct() {
    const nameValue = document.getElementById('title').value;
    const imageValue = document.getElementById('image').value;
    const priceValue = Number(document.getElementById('price').value);
    const stockValue = Number(document.getElementById('stock').value);
    const descriptionValue = document.getElementById('description').value;
    
    const product = {
        name: nameValue,
        image: imageValue,
        price: priceValue,
        stock: stockValue,
        description: descriptionValue
    };

    http.post(productsAdminURL, product).then(() => getProducts());   
    
    document.getElementById('title').value = ''; 
    document.getElementById('image').value = ''; 
    document.getElementById('price').value = ''; 
    document.getElementById('stock').value = ''; 
    document.getElementById('description').value = ''; 
    notify('addProductToJSON', 'success', 'The product has been successfully added to the database!');
}

function updateProduct(e) {
    console.log(e.target);
    if(e.target.tagName === 'svg'){
        console.log('this is svg tag');
    }
    if(e.target.tagName === 'path'){
        console.log('this is svg path');
    }
    if(e.target.tagName === 'button'){
        console.log('this is button tag');
    }

    // if(e.target.parentElement.parentElement.classList.contains('update')){
    //     console.log('icon btn update and id is: ');
    // }
    // if(e.target.classList.contains('update')){
    //     const id = e.target.id;
    //     console.log('this is update btn and id is :' + id);
    // }
}

function deleteProduct(e) {   
    if(e.target.classList.contains('delete')){
        const id = e.target.id;
        http
            .delete(`${productsAdminURL}/${id}`)
            .then(() => getProducts())
            .then(() => notify('deleteProductFromJSON', 'danger', 'The product was succesfully deleted'))
            .catch('Error on delete');
    }
}