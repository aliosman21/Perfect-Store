const express = require("express");
const app = express();
const cors = require("cors");
const registerRoute = require("./Components/Users/RegisterRoute");
const loginRoute = require("./Components/Users/LoginRoute");
const productRoute = require("./Components/Products/NewProduct");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
//const MongoClient = require("mongodb").MongoClient;

dotenv.config();
//const <route name> = require("route path")

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../JS-Frontend/assets")));
app.use("/User/register", registerRoute);
app.use("/User/login", loginRoute);
app.use("/products/addNewProduct", productRoute);
app.use("/uploads", express.static("uploads"));
//app.use("<route custom name>", const <route name>)
//app.use("/", (req, res) => {});
app.get("/", (req, res) => {
  res.render("index.ejs", {
    loggedIn: true,
    username: "Omar"
  });
});

app.get("/edit", (req, res) => {
  res.render("edit-info.ejs", {
    loggedIn: false,
    username: "Omar Yehia"
  });
});
app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "../JS-Frontend/pages/products.html"));
});
app.get("/products/1", (req, res) => {
  res.sendFile(path.join(__dirname, "../JS-Frontend/pages/view-product.html"));
});

app.get("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname, "../JS-Frontend/pages/add-product.html"));
});
app.get("/log", (req, res) => {
  res.sendFile(path.join(__dirname, "../JS-Frontend/pages/loginSignup.html"));
});
app.listen(port, () => console.log("Server is up on port " + port));
