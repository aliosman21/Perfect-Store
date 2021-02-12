const router = require("express").Router();
const Users = require("./RegisterUserModel");
const connectionToDB = require("../DBConnector/ConnectionHandler");
const jwt = require("jsonwebtoken");

//DajanTr2IO2nkJiY;

router.post("/addUser", async (req, res) => {
   connectionToDB.establishConnection();

   console.log("HELLO TO ENDPOINT");
   const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
   });
   try {
      const savedUser = await user.save();
      console.log("User saved");
      res.send(savedUser);
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
   } finally {
      connectionToDB.closeConnection();
   }
});

module.exports = router;
