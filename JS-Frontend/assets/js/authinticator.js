(function() {
    const loggedIn = document.querySelector("#logged-in");
    const hrefEl = document.querySelector("#login-edit");
    if(localStorage.getItem("token") === null) {
        loggedIn.innerText = "Login/Register";
        hrefEl.href = "login-signup";
    } else {
        
        if(localStorage.getItem("isAdmin")){
            loggedIn.innerText = "Admin Panel";
            hrefEl.href = "/admin-panel";
        } else {
            loggedIn.innerText = localStorage.getItem("name");
            hrefEl.href = "/edit-info";
        } 
    }
})();