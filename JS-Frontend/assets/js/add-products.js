const submitBtn = document.querySelector(".form-btn");

submitBtn.addEventListener("click", e => {
    e.preventDefault();
    addProduct();
});

async function addProduct() {
    // const response = await fetch("/products/addNewProduct", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         name: document.querySelector("#name").value,
    //         quantity: document.querySelector("#quantity").value,
    //         description: document.querySelector("#textarea").value,
    //         price: document.querySelector("#price").value,
    //         image: document.querySelector("#img").value,
    //         token: localStorage.getItem("token")
    //     })
    // });

    const formData = new FormData();
    formData.append('image', document.querySelector("#img").value);
    formData.append('name', document.querySelector("#name").value);
    formData.append('quantity', document.querySelector("#quantity").value);
    formData.append('price', document.querySelector("#price").value);
    formData.append('description', document.querySelector("#textarea").value);
    formData.append('token', localStorage.getItem("token"));

    const response = await fetch("/products/addNewProduct", {
        method: "POST",
        body: formData,
        
    })

    const jsonRes = response.json();
    const messageEl = document.querySelector("#message");
    messageEl.innerText = jsonRes["message"];
    if(jsonRes["success"] === true) {
        messageEl.style.color = "green";
    } else {
        messageEl.style.color = "red";
    }
}