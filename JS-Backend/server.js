const express = require("express");
const app = express();
const cors = require("cors");
const registerRoute = require("./Components/Users/RegisterRoute");
const loginRoute = require("./Components/Users/LoginRoute");
const dotenv = require("dotenv");
<<<<<<< HEAD
const mongoose = require("mongoose");
const path = require("path");
=======
>>>>>>> a4da557dae56d9256bb59bbdba5f6fadfba100c8
//const MongoClient = require("mongodb").MongoClient;

dotenv.config();
//const <route name> = require("route path")

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../JS-Frontend/assets")));
app.use("/User/register", registerRoute);
app.use("/User/login", loginRoute);

//app.use("<route custom name>", const <route name>)
//app.use("/", (req, res) => {});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../JS-Frontend/index.html"));
});
app.listen(port, () => console.log("Server is up on port " + port));
