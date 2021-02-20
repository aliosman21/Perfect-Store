(function () {
  getProducts();
})();

async function getProducts() {
  const productsContainer = document.querySelector(".product-container");
  let response = await fetch(`/products/getAll`);
  let jsonRes = await response.json();

  /**
     * query for each page
     jsonRes = {
         categoryName: Something
         totalnumberof products: --
         Numberofpages: something
         data = []

     }


     [{"_id":"6030f117144b8936c0bd4b49","name":"laptop","quantity":552,"price":300,"image":"uploads\\r.jpg","__v":0},
     */

  // kekkw
  jsonRes.forEach((product) => {
    const cardEl = document.createElement("div");
    const imgContainerEl = document.createElement("div");
    const imgEl = document.createElement("img");
    const productCtlEl = document.createElement("div");
    const productDescEl = document.createElement("div");
    const productNameEl = document.createElement("h4");
    const productPriceEl = document.createElement("h5");
    const productBtns = document.createElement("div");
    const cartBtnEl = document.createElement("button");

    cardEl.classList.add("product-card");
    imgContainerEl.classList.add("img-container");
    imgEl.src = product.image; /////////********//////////
    productCtlEl.classList.add("product-controls");
    productDescEl.classList.add("product-desc");
    productNameEl.innerText = product.name; ////***//// */
    productPriceEl.innerText = "$" + product.price; ////***/// */
    productBtns.classList.add("product-btns");
    cartBtnEl.classList.add("btn-card");
    cartBtnEl.innerHTML =
      "<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='currentColor' class='bi bi-bag-check' viewBox='0 0 16 16' ><path fill-rule='evenodd' d='M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z'/><path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z'/></svg><p>ADD TO CART</p>";
    cartBtnEl.id = product["_id"];

    productDescEl.appendChild(productNameEl);
    productDescEl.appendChild(productPriceEl);
    productCtlEl.appendChild(productDescEl);
    productCtlEl.appendChild(productBtns);
    productBtns.appendChild(cartBtnEl);
    imgContainerEl.appendChild(imgEl);
    cardEl.appendChild(imgContainerEl);
    cardEl.appendChild(productCtlEl);
    productsContainer.appendChild(cardEl);
  });

  let afaf = document.getElementsByClassName("btn-card");
  let span = document.getElementById("span");
  let count = 0;
  for (let i = 0; i < afaf.length; i++) {
    console.log(afaf[i]);
    afaf[i].onclick = () => {
      count += 1;
      span.innerHTML = count;
      console.log(count);
    };
  }
}
