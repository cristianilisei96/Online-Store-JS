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
                                <img src="${product.image}" class="card-img-top mb-4" alt="${product.name}"/>
                                <h5 class="card-title">${product.name}</h5>
                                    <p>$${product.price}</p>
                                        <hr>
                            </a>
                            <button class="btn btn-success addToCartBtn" id="${product.id}">
                                <i class="fas fa-cart-plus addToCartIcon"></i> Add to cart
                            </button>
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
                            <img src="${product.image}" class="card-img-top mb-4" alt="${product.name}">
                                <h5 class="card-title">${product.name}</h5>
                                    <p>$${product.price}</p>
                                        <hr>
                            </a>
                            <button class="btn btn-success addToCartBtn" id="${product.id}">
                                <i class="fas fa-cart-plus addToCartIcon"></i> Add to cart
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
        <div class="col-md-6">
            <div class="p-1">
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
                <div class="text-xs-center text-sm-center text-md-start text-lg-start text-xl-start">
                    <button class="btn btn-success addToCartBtn" id="${product.id}">
                        <i class="fas fa-cart-plus addToCartIcon"></i> Add to cart
                    </button>
                </div>
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
                        <a href="details?id=${product.id}">
                            <img src="${product.image}" alt="${product.name}" class="img-sm">
                        </a>
                    </th>
                    <td class="text-nowrap">
                        <a href="details?id=${product.id}">
                            <h6 class="m-0">${product.name}</h6>
                        </a>
                    </td>
                    <td>
                        <p class="m-0 fw-bold color-default">$${product.price}</p>
                    </td>
                    <td>
                        <p class="m-0 fw-bold">${product.stock}</p>
                    </td>
                    <td id="actionsBtns" class="text-nowrap">
                        <button type="button" class="btn btn-warning updateBtn" id="${product.id}">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" class="btn btn-danger deleteBtn" id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
            this.adminProductList.innerHTML = output;
        });
    }
}

export const ui = new UI();