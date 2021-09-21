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
                                            <button class="btn btn-success" id="">Add to cart</button>
                            </a>
                        </div>
                    </div>
                </div>
                `;
                this.productContainer.innerHTML = output;
        });
    }

    showCartToUser(products){

    }

    showProductDetails(product){
        this.containerDetailsProduct.innerHTML = 
        `<div class="col-md-6 mb-4">
            <img src="${product.image}" class="img-fluid" alt="">
        </div>
        <div class="col-md-6 mb-4">
            <div class="p-4">
                <div class="mb-3">
                    <h5>${product.name}</h5>
                </div>

                <p class="lead">
                    <span class="color-default">$${product.price}</span>
                </p>    

                <p class="lead fw-bold">Description</p>

                <p>${product.description}.</p>

                <form class="d-flex justify-content-left">
                    <input type="number" value="1" aria-label="Search" class="form-control" style="width: 100px">
                      <button class="btn btn-success btn-md my-0 p waves-effect waves-light" type="submit">Add to cart
                        <i class="fas fa-shopping-cart ml-1"></i>
                      </button>
                </form>
            </div>
        </div>
        <div id="paginationProducts" class="col-md-12 mt-4 text-center">
            <button id="prev" class="btn btn-success prev" disabled href="#">Previous Product</button>
            <button id="next" class="btn btn-success next" href="#">Next Product</button>
        </div>`;
    }

    showProductsToAdmins(products){
        let output = '';
        products.forEach(product => {
            output += 
                `
                <tr>
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
                        ${product.quantity}
                    </td>
                    <td>
                        <button class="btn btn-danger delete" id="${product.id}">Delete</button>
                    </td>
                </tr>
                `;
                this.adminProductList.innerHTML = output;
        });
    }
}

export const ui = new UI();