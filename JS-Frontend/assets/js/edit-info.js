const submitBtn = document.querySelector("#submit")


submitBtn.addEventListener("click", e => {
    e.preventDefault();
    updateInfo();
})

async function updateInfo() {
    const response = await fetch("/updateroute", {
        method: "PATCH",
        body: JSON.stringify({
            name: document.querySelector("#name").nodeValue,
            email: document.querySelector("#email").value,
            address: document.querySelector("#address").value,
            password: document.querySelector("#password").value
        })
    })

    const jsonRes = await response.json();

    const updateMessageEl = document.querySelector("#update-message");
    updateMessageEl.innerText = jsonRes["message"];
    if(jsonRes["success"] === true) {
        updateMessageEl.style.color = "green";
    } else {
        updateMessageEl.style.color = "rgba(255, 0, 0, 0.658)";
    }
}