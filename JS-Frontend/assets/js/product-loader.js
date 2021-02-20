(function() {
    getProducts();
    getCategories();
})();


async function getProducts() {
    const productsContainer = document.querySelector("#more-products-container");
    let response = await fetch("/products/featured");
    let jsonRes = await response.json();

    jsonRes.forEach(product => {
        const cardEl = document.createElement("div");
        const imgContainerEl = document.createElement("div");
        const imgEl = document.createElement("img");
        const productCtlEl = document.createElement("div");
        const productDescEl = document.createElement("div");
        const productNameEl = document.createElement("h4");
        const productPriceEl = document.createElement("h5");
        const viewBtnDivEl = document.createElement("div");
        const viewBtnEl = document.createElement("button");

        cardEl.classList.add("product-card");
        imgContainerEl.classList.add("img-container");
        imgEl.src = product.image; /////////********//////////
        productCtlEl.classList.add("product-controls");
        productDescEl.classList.add("product-desc");
        productNameEl.innerText = product.name; ////***//// */
        productPriceEl.innerText = product.price; ////***/// */
        viewBtnDivEl.classList.add("btn-product");
        viewBtnEl.innerText = "VIEW";
        viewBtnEl.id = product.id; ////*****///// */

        viewBtnDivEl.appendChild(viewBtnEl);
        productDescEl.appendChild(productNameEl);
        productDescEl.appendChild(productPriceEl);
        productCtlEl.appendChild(productDescEl);
        productCtlEl.appendChild(viewBtnDivEl);
        imgContainerEl.appendChild(imgEl);
        cardEl.appendChild(imgContainerEl);
        cardEl.appendChild(productCtlEl);
        productsContainer.appendChild(cardEl);

    });
}

async function getCategories() {
    const catContainer = document.querySelector("#list-cat");
    let response = await fetch("/categories");
    let jsonRes = await response.json();

    jsonRes.forEach(category => {
        const catEl = document.createElement("div");
        const anchorEl = document.createElement("a");
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");
        const catNameEl = document.createAttribute("p");

        catEl.classList.add("cat");
        anchorEl.href = `/categories/${category.id}`;
        imgContainer.classList.add("img-cat");
        img.src = category.image;
        catNameEl.innerText = category.name;

        imgContainer.appendChild(img);
        anchorEl.appendChild(imgContainer);
        anchorEl.appendChild(catNameEl);
        catEl.appendChild(anchorEl);
        catContainer.appendChild(catEl);
    });
}