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
        `<div class="col-md-6 mb-3 text-center">
            <img src="${product.image}" class="img-fluid" alt="${product.name}">
        </div>
        <div class="col-md-6 my-auto">
            <div id="contentInfoProduct" class="p-2">
                <div id="nameProduct" class="text-xs-center text-sm-center text-md-start text-lg-start text-xl-start mb-3">
                    <h3>${product.name}</h3>
                </div>
                <p class="lead fw-bold text-xs-center text-sm-center text-md-start text-lg-start text-xl-start">
                    <span class="color-default">$${product.price}</span>
                </p>    
                <hr>
                <p class="lead fw-bold text-xs-center text-sm-center text-md-start text-lg-start text-xl-start">
                    Description
                </p>
                <p class="text-xs-center text-sm-center text-md-start text-lg-start text-xl-start">${product.description}.</p>
                <div class="text-xs-center text-sm-center text-md-start text-lg-start text-xl-start">
                    <button class="btn btn-success addToCartBtn" id="${product.id}">
                        <i class="fas fa-cart-plus addToCartIcon"></i> Add to cart
                    </button>
                </div>
            </div>
        </div>`;
        // Get title element of local category page
        let websiteTitle = document.getElementById('websiteTitle');
        websiteTitle.textContent = `${product.name}`;
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
                        <button type="button" class="btn btn-warning updateBtn" value="${product.id}" data-bs-toggle="modal" data-bs-target="#updateProductModal">
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