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
    input.addEventListener('keydown', handler);
});

function handler(e) {
    loginOnEnterKey(e);
}

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
    const newnameValue = document.getElementById('newTitle').value;
    const newImageValue = document.getElementById('newImage').value;
    const newPriceValue = Number(document.getElementById('newPrice').value);
    const newStockValue = Number(document.getElementById('newStock').value);
    const newDescriptionValue = document.getElementById('newDescription').value;

    http.put(productsAdminURL, product).then(() => getProducts()); 
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