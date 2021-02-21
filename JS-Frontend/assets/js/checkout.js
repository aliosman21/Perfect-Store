let x = localStorage.getItem("cart");
let arrayOfItems = x.split(",");
console.log(arrayOfItems);

// now we need to fetch the above IDs to retrieve the data that we want!

function getTotal() {
  const totalValue = document.querySelector(".total-value");
  const rows = document.getElementsByClassName("row");

  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    const children = rows[i].childNodes;
    total += parseInt(children[7].innerText) * parseInt(children[5].value);
  }

  totalValue.innerText = total;
}

getTotal();

const quantity1 = document.querySelector("#x1");

quantity1.addEventListener("mouseup", () => {
  console.log("hi");
  getTotal();
});

quantity1.addEventListener("keyup", () => {
  console.log("hi");
  getTotal();
});
