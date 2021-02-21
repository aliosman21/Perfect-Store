(function () {
  getProducts();
  getCategories();
})();

async function getProducts() {
  const productsContainer = document.querySelector(".more-products-container");
  let response = await fetch("http://localhost:5000/products/featured");

  let jsonRes = await response.json();
  console.log(jsonRes);
  jsonRes.forEach((product) => {
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
    imgEl.src = "http://localhost:5000/" + product.image; /////////********//////////
    productCtlEl.classList.add("product-controls");
    productDescEl.classList.add("product-desc");
    productNameEl.innerText = product.name; ////***//// */
    productPriceEl.innerText = "$" + product.price; ////***/// */
    viewBtnDivEl.classList.add("btn-product");
    viewBtnEl.innerText = "Add To Cart";
    viewBtnEl.id = product["_id"]; ////*****///// */

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
  let afaf = document.getElementsByClassName("btn-product");
  let span = document.getElementById("span");
  // console.log(afaf);

  // afaf.prototype.forEach.call((ayhaga) => {
  //   ayhaga.addEventListener("click", (e) => {
  //     e.stopPropagation();
  //     count += 1;
  //     span.innerHTML = count;
  //     console.log(count);
  //   });
  // });
  let count = 0;
  for (let i = 0; i < afaf.length; i++) {
    console.log(afaf[i]);
    afaf[i].onclick = (e) => {
      /* Hi Abdelfata7 
      Regarding the cart, I've made a "Set" in landing.js called card
      Set only keeps unique data so if button is clicked twice for same product it wont add it

      So just change your red dot on the cart icon in nav bar to show the length of this Set

      The Set keeps track of product ids by
      "e.target.id" this will always return the id of the Product

      Now we have 2 options
      First one is to keep those ids and save them in localStorage
      Then in a checkout page take this array and fetch single products products

      The second option is below ..
      */
      cart.add(e.target.id);
      console.log(cart);
      span.innerHTML = cart.size;

      /* 
      Second option shown below is just to DOM manipulate and get information using DOM, and save the whole
      object in the set, then loop in the checkout page
      */
      console.log(e.currentTarget.parentElement.firstChild.firstChild); // this returns the name of product
      console.log(e.currentTarget.parentElement.firstChild.lastChild); // this returns the price
      console.log(
        e.currentTarget.parentElement.parentElement.firstChild.firstChild.src
      ); // this returns the src of the image

      /*
      I couldn't do the first option because the fetch single item wasn't done in the backend
      If you wake up before me just pick which is suitable for you from both options
      */

      /*
      Checkout page nearly completed, CSS needs modification, 
      JS will work with one of the two options,
      bs el logic sh3'al y3ny, grb t3'yr el quantity ely fi awl row di
      htla2y el total byt3'yr

      children[7] da htla2eh hnak, da bygeb el price ely mktob
      children[5] da bygeb ely mktob gwa el quantity 3shan lw toht
      */
    };
  }
}

async function getCategories() {
  const catContainer = document.querySelector("#list-cat");
  let response = await fetch("/categories");
  let jsonRes = await response.json();

  jsonRes.forEach((category) => {
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
