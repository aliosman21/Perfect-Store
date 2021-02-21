/** Main */

(function(){
  retrieveProducts();
})();



/* Helpers */
async function retrieveProducts() {
  let x = localStorage.getItem("cart");
  if(x) {
    var arrayOfItems = x.split(",");
    var cart = new Set(arrayOfItems);
    span.innerHTML = cart.size;
  }
  else {
    var cart = new Set();
    span.innerHTML = "";
  }

  const response = await fetch("/products/getById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      products: arrayOfItems
    })
  })

  const jsonRes = await response.json();
  const products = jsonRes["products"];
  const container = document.querySelector(".row-container");

  products.forEach(product => {
    const rowEl = document.createElement("div");
    const imgEl = document.createElement("img");
    const labelEl = document.createElement("label");
    const quantityEl = document.createElement("input");
    const priceEl = document.createElement("p");
    const spanEl = document.createElement("span");
    const span$El = document.createElement("span");
    const removeBtn = document.createElement("button");

    rowEl.classList.add("row");
    imgEl.src = product.image;
    labelEl.innerText = product.name;
    quantityEl.type = "number";
    quantityEl.name = "quantity";
    quantityEl.classList.add("quantity");
    quantityEl.id = product["_id"];
    quantityEl.min = "1";
    quantityEl.value = "1";
    spanEl.innerText = product.price;
    removeBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg>"
    removeBtn.classList.add("removeBtn");
    removeBtn.id = product["_id"];


    priceEl.appendChild(span$El);
    priceEl.appendChild(spanEl);
    rowEl.appendChild(imgEl);
    rowEl.appendChild(labelEl);
    rowEl.appendChild(quantityEl);
    rowEl.appendChild(priceEl);
    rowEl.appendChild(removeBtn);
    container.appendChild(rowEl);
  });

  getTotal();
  function getTotal() {
    const totalValue = document.querySelector(".total-value");
    const rows = document.getElementsByClassName("row");
  
    let total = 0;
    for (let i = 0; i < rows.length; i++) {
      const children = rows[i].childNodes;
      total += parseInt(children[3].lastChild.innerText) * parseInt(children[2].value);

      children[2].addEventListener("mouseup", () => {
        getTotal();
      });

      children[2].addEventListener("keyup", () => {
        getTotal();
      });
    }
    totalValue.innerText = total;
  }

  (function() {
    const removeBtns = document.getElementsByClassName("removeBtn");
    for(let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].addEventListener("click", e =>{
        e.preventDefault();
        cart.delete(e.currentTarget.id)
        const targetRow = e.currentTarget.parentElement;
        const container = document.querySelector(".row-container");
        container.removeChild(targetRow);
        span.innerHTML = cart.size;
        localStorage.setItem("cart",  Array.from(cart));
        getTotal();
      });
    }
  })();

}


