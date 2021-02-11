const router = require("express").Router();
const Users = require("./RegisterUserModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//DajanTr2IO2nkJiY;

router.post("/addUser", async (req, res) => {
   console.log("HELLO TO ENDPOINT");
   const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
   });
   try {
      const savedUser = await user.save();
      console.log("User saved");
      res.send(savedUser);
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
   }
});

module.exports = router;
