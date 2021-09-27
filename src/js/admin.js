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
        fullname: "Cristian Ilisei",
        password: "Admin1"
    }, 
    {
        email: "admin@admin.com",
        fullname: "Admin",
        password: "admin"
    }
];

loginBtn.addEventListener('click', (e) => {
    var emailInputValue = emailFieldAdmin.value;
    var password = passwordFieldAdmin.value;
    if ( password == '' ) {
        console.log('password is empty');
    }
    e.preventDefault();
    for(let i = 0; i < objAdmin.length; i++) {
        
        if( (emailInputValue == objAdmin[i].email) && (password == objAdmin[i].password) ){
            loginPage.hidden = true;
            appPage.hidden = false;
            
            notify('loginSuccessfully','success','You have successfully logged in');
            sessionStorage.setItem('loginSession', objAdmin[i].fullname);
            checkIfItIsALoginSession();
        } 
    }
    fullnameAdmin.innerText = sessionStorage.getItem('loginSession');
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