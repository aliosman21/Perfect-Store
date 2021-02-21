const addBtn = document.querySelector("#addBtn");
const editBtn = document.querySelector("#editBtn");

getAllOrders();

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addProduct();
});

editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  editProduct();
});

async function addProduct() {
  const formData = new FormData();
  formData.append("image", document.querySelector("#img").files[0]);
  formData.append("name", document.querySelector("#name").value);
  formData.append("quantity", document.querySelector("#quantity").value);
  formData.append("price", document.querySelector("#price").value);
  formData.append("description", document.querySelector("#textarea").value);
  formData.append("token", localStorage.getItem("token"));

  const response = await fetch("/products/addNewProduct", {
    method: "POST",
    body: formData,
  });

  const jsonRes = await response.json();
  console.log(jsonRes);
  const messageEl = document.querySelector("#message");
  messageEl.innerText = jsonRes["message"];
  if (jsonRes["success"] === true) {
    messageEl.style.color = "green";
  } else {
    messageEl.style.color = "red";
  }
}

async function editProduct() {
  const formData = new FormData();
  formData.append("id", document.querySelector("#id").value);
  formData.append("image", document.querySelector("#img").files[0]);
  formData.append("name", document.querySelector("#name").value);
  formData.append("quantity", document.querySelector("#quantity").value);
  formData.append("price", document.querySelector("#price").value);
  formData.append("description", document.querySelector("#textarea").value);
  formData.append("token", localStorage.getItem("token"));

  const response = await fetch("/products/editProduct", {
    method: "PATCH",
    body: formData,
  });

  const jsonRes = await response.json();
  console.log(jsonRes);
  const messageEl = document.querySelector("#message");
  messageEl.innerText = jsonRes["message"];
  if (jsonRes["success"] === true) {
    messageEl.style.color = "green";
  } else {
    messageEl.style.color = "red";
  }
}

/* From Manipulation */
const viewAdd = document.querySelector("#show-add");
const viewEdit = document.querySelector("#show-edit");
const viewOrders = document.querySelector("#show-all");
const addForm = document.querySelector("#add-product");
const editForm = document.querySelector("#edit-product");
const allForm = document.querySelector("#prev-orders");

viewAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addForm.classList.add("active");
  editForm.classList.remove("active");
  allForm.classList.remove("active");
});

viewEdit.addEventListener("click", (e) => {
  e.preventDefault();
  addForm.classList.remove("active");
  editForm.classList.add("active");
  allForm.classList.remove("active");
});

viewOrders.addEventListener("click", (e) => {
  e.preventDefault();
  addForm.classList.remove("active");
  editForm.classList.remove("active");
  allForm.classList.add("active");
});

async function getAllOrders() {
  const response = await fetch("/orders/getAll");
  const jsonRes = await response.json();
  const orders = jsonRes.products;
  console.log(orders.length);
  const rowCont = document.querySelector(".row-container");
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    console.log(order);
    for (let j = 0; j < order.length; j++) {
      const rowEl = document.createElement("div");
      const imgEl = document.createElement("img");
      const labelEl = document.createElement("label");
      const quantityEl = document.createElement("label");
      const priceEl = document.createElement("p");
      const spanEl = document.createElement("span");
      const span$El = document.createElement("span");

      console.log(order[j].image);

      rowEl.classList.add("row");
      imgEl.src = order[j].image;
      labelEl.innerText = order[j].name;
      quantityEl.innerText = order[j].quantity;
      spanEl.innerText = parseInt(order[j].price) * parseInt(order[j].quantity);
      span$El.innerText = "$ ";

      priceEl.appendChild(span$El);
      priceEl.appendChild(spanEl);
      rowEl.appendChild(imgEl);
      rowEl.appendChild(labelEl);
      rowEl.appendChild(quantityEl);
      rowEl.appendChild(priceEl);
      rowCont.appendChild(rowEl);
    }
  }
}
