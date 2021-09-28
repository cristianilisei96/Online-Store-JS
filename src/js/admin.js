import { http } from './http.js';
import { ui } from './ui.js';

const productsAdminURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/';

// Get elem from html
const updateProductBtn = document.getElementById('updateProductBtn');

// Get elem of 'pages'
const loginPage = document.getElementById('loginPage');
const appPage = document.getElementById('appPage');

// Get elem from admin 'page'
const emailFieldAdmin = document.getElementById('emailFieldAdmin');
const passwordFieldAdmin = document.getElementById('passwordFieldAdmin');
const loginBtn = document.getElementById('loginBtn');
const homepageBtn = document.getElementById('homepageBtn');

var objAdmin = [
    {
        email: "admin@admin.com",
        fullname: "Cristian Ilisei",
        password: "admin"
    }
];

const inputs = [
    document.getElementById('emailFieldAdmin'),
    document.getElementById('passwordFieldAdmin')
];

inputs.forEach((input) => {
    input.addEventListener('keydown', loginOnEnterKey);
});

function loginOnEnterKey(e) {
    if (e.keyCode === 13) {
        loginFormValidation(e);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
}

function loginFormValidation(){
    let emailInputValue = emailFieldAdmin.value;
    let passwordInputValue = passwordFieldAdmin.value;

    if(emailInputValue == '') {
        notify('inputFieldFailed', 'danger', 'Email field cannot be empty');
    } else if( (emailInputValue != objAdmin[0].email) ){
        notify('inputFieldFailed', 'danger', 'Email is wrong');
    } 

    if(passwordInputValue == '') {
        notify('inputFieldFailed', 'danger', 'Password field cannot be empty');
    } else if( (passwordInputValue != objAdmin[0].password) ){
        notify('inputFieldFailed', 'danger', 'Password is wrong');
    }
    
    for(let i = 0; i < objAdmin.length; i++) {
        if( (emailInputValue == objAdmin[i].email) && (passwordInputValue == objAdmin[i].password) ){
            loginPage.hidden = true;
            appPage.hidden = false;
            notify('loginSuccessfully','success','You have successfully logged in');
            sessionStorage.setItem('loginSession', objAdmin[i].fullname);
            checkIfItIsALoginSession();
        } 
        
    }
    fullnameAdmin.innerText = sessionStorage.getItem('loginSession');
}

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormValidation();
});

homepageBtn.addEventListener('click', goToHome);

document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    http.get(productsAdminURL).then((products) => ui.showProductsToAdmins(products));
}

document.getElementById('add-product').addEventListener('click', addNewProduct);
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

document.getElementById('products-container').addEventListener('click', bringTheProductInfoToBeUpdated);

function bringTheProductInfoToBeUpdated(e) {
    const eventTargetOnBtn = e.target.classList.contains('updateBtn');
    const eventTargetOnSVG = e.target.parentElement.classList.contains('updateBtn');
    const eventTargetOnPath = e.target.parentElement.parentElement.classList.contains('updateBtn');
    
    if(eventTargetOnBtn){
        let idProduct = e.target.value;
        const productInfoURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;

        fetch(productInfoURL)
            .then((response) => response.json())
            .then((objectProduct) => {
                newName.value = objectProduct.name;
                newImage.value = objectProduct.image;
                newPrice.value = objectProduct.price;
                newStock.value = objectProduct.stock;
                newDescription.value = objectProduct.description;
                updateProductBtn.value = objectProduct.id;  
            });   
    } else if(eventTargetOnSVG){
        let idProduct = e.target.parentElement.value;
        const productInfoURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;

        fetch(productInfoURL)
            .then((response) => response.json())
            .then((objectProduct) => {
                newName.value = objectProduct.name;
                newImage.value = objectProduct.image;
                newPrice.value = objectProduct.price;
                newStock.value = objectProduct.stock;
                newDescription.value = objectProduct.description;
                updateProductBtn.value = objectProduct.id;  
            }); 
    } else if(eventTargetOnPath){
        let idProduct = e.target.parentElement.parentElement.value;
        const productInfoURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idProduct;

        fetch(productInfoURL)
            .then((response) => response.json())
            .then((objectProduct) => {
                newName.value = objectProduct.name;
                newImage.value = objectProduct.image;
                newPrice.value = objectProduct.price;
                newStock.value = objectProduct.stock;
                newDescription.value = objectProduct.description;
                updateProductBtn.value = objectProduct.id;  
            });  
    }
}

updateProductBtn.addEventListener('click', updateProduct);

function updateProduct(e){
    let idOfProductToBeUpdated = e.target.value;
    const produtInfoURL = 'https://61363d1a8700c50017ef54c3.mockapi.io/products/' + idOfProductToBeUpdated;

    const product = {
        name: newName.value,
        image: newImage.value,
        price: newPrice.value,
        stock: newStock.value,
        description: newDescription.value
    };

    http.put(produtInfoURL, product)
        .then(() => getProducts());
    notify('editedProductToJSON', 'success', 'The product has been successfully modified');
    newName.value = '';
    newImage.value = '';
    newPrice.value = '';
    newStock.value = '';
    newDescription.value = '';
    updateProductBtn.value = ''; 
}

function deleteProduct(e) {   
    const eventTargetOnBtn = e.target.classList.contains('deleteBtn');
    const eventTargetOnSVG = e.target.parentElement.classList.contains('deleteBtn');
    const eventTargetOnPath = e.target.parentElement.parentElement.classList.contains('deleteBtn');

    if(eventTargetOnBtn){
        const id = e.target.id;
        http
            .delete(`${productsAdminURL}/${id}`)
            .then(() => getProducts())
            .then(() => notify('deleteProductFromJSON', 'danger', 'The product was succesfully deleted'))
            .catch('Error on delete');
    } else if(eventTargetOnSVG) {
        const id = e.target.id;
        http
            .delete(`${productsAdminURL}/${id}`)
            .then(() => getProducts())
            .then(() => notify('deleteProductFromJSON', 'danger', 'The product was succesfully deleted'))
            .catch('Error on delete');
    } else if(eventTargetOnPath){
        const id = e.target.id;
        http
            .delete(`${productsAdminURL}/${id}`)
            .then(() => getProducts())
            .then(() => notify('deleteProductFromJSON', 'danger', 'The product was succesfully deleted'))
            .catch('Error on delete');
    }
}