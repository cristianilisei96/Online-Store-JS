class UI {
    constructor() {
        this.productContainer = document.getElementById('products-items-list');
        this.searchResultContainer = document.getElementById('searchResultContainer');
        this.containerDetailsProduct = document.getElementById('detailsProduct');
        this.adminProductList = document.getElementById('tbody-list-products');
    }

    showSearchResult(products) {
        let output = '';
        products.forEach(product => {
            output += 
                `<div class="col-md-3">
                    <div class="card mb-3">
                        <div class="card-body text-center">
                            <a href="details?id=${product.id}" id="${product.id}" class="details">
                            <img src="${product.image}" class="card-img-top mb-4" alt="...">
                                <h5 class="card-title">${product.name}</h5>
                                    <p>$${product.price}</p>
                                        <hr>
                                            <button class="btn btn-success" id="">Add to cart</button>
                            </a>
                        </div>
                    </div>
                </div>
                `;
            this.searchResultContainer.innerHTML = output;
        });
    }

    showProductsToUsers(products){
        let output = '';
        products.forEach(product => {
            output += 
                `<div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-body text-center">
                            <a href="details?id=${product.id}" id="${product.id}" class="details">
                            <img src="${product.image}" class="card-img-top mb-4" alt="...">
                                <h5 class="card-title">${product.name}</h5>
                                    <p>$${product.price}</p>
                                        <hr>
                            </a>
                            <button class="btn btn-success addToCartBtn" id="${product.id}">
                                <i class="fas fa-cart-plus"></i> Add to cart
                            </button>
                        </div>
                    </div>
                </div>
                `;
            this.productContainer.innerHTML = output;
        });
    }

    showProductDetails(product){
        this.containerDetailsProduct.innerHTML = 
        `<div class="col-md-6 mb-4 text-center">
            <img src="${product.image}" class="img-fluid" alt="${product.name}">
        </div>
        <div class="col-md-6 mb-4">
            <div class="p-4">
                <div class="mb-3">
                    <h3>${product.name}</h3>
                </div>
                <p class="lead fw-bold">
                    <span class="color-default">$${product.price}</span>
                </p>    
                <p class="lead fw-bold">
                    Description
                </p>
                <p>${product.description}.</p>
                <button class="btn btn-success addToCartBtn" id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Add to cart
                </button>
            </div>
        </div>`;
        // Script cart - add product to localstorage
        document.getElementById(`${product.id}`).addEventListener('click', addToCartFunction);
    }

    showProductsToAdmins(products){
        let output = '';
        products.forEach(product => {
            output += 
                `<tr class="align-middle">
                    <th scope="row">
                        <img src="${product.image}" class="" alt="${product.name}" width="100">
                    </th>
                    <td>
                        ${product.name}
                    </td>
                    <td>
                        ${product.price}
                    </td>
                    <td>
                        ${product.stock}
                    </td>
                    <td id="actionsBtns">
                        <button type="button" class="btn btn-warning update" id="${product.id}">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" class="btn btn-danger delete" id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
            this.adminProductList.innerHTML = output;
        });
    }
}

export const ui = new UI();