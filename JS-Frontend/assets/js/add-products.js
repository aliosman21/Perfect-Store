const submitBtn = document.querySelector(".form-btn");

submitBtn.addEventListener("click", e => {
    e.preventDefault();
    addProduct();
});

async function addProduct() {
    const response = await fetch("/products/addNewProduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.querySelector("#name").value,
            quantity: document.querySelector("#quantity").value,
            description: document.querySelector("#textarea").value,
            price: document.querySelector("#price").value,
            // image: document.querySelector("#img").value,
            token: localStorage.getItem("token")
        })
    });

    const jsonRes = response.json();
    const messageEl = document.querySelector("#message");
    messageEl.innerText = jsonRes["message"];
    if(jsonRes["success"] === true) {
        messageEl.style.color = "green";
    } else {
        messageEl.style.color = "red";
    }
}