const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signIn = document.querySelector("#sign-in");
const signUp = document.querySelector("#sign-up");

signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

signIn.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  signup();
});

async function login() {
  let response = await fetch("/User/login/authenticateLogin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.querySelector("#sign-in-username").value,
      password: document.querySelector("#sign-in-password").value,
    }),
  });

  let jsonRes = await response.json();

  if (jsonRes["success"] == false) {
    let errorEl = document.querySelector(".error-message");
    errorEl.innerText = jsonRes["statusMessage"];
  } else {
    localStorage.setItem("token", jsonRes["token"]);
    localStorage.setItem("name", jsonRes["name"]);
    location.href = "/";
  }
}

async function signup() {
  let response = await fetch("http://localhost:5000/User/register/addUser", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }, // ay haga
    body: JSON.stringify({
      name: document.querySelector("#sign-up-username").value,
      email: document.querySelector("#sign-up-email").value,
      address: document.querySelector("#address").value,
      password: document.querySelector("#sign-up-password").value,
    }),
  });

  let jsonRes = await response.json();

  if (jsonRes["success"] == false) {
    let errorEl = document.querySelector(".error-message");
    errorEl.innerText = jsonRes["statusMessage"];
  } else {
    location.href = "/";
  }
}
