const router = require("express").Router();
const productsSchema = require("./ProductModel");
const connectionToDB = require("../DBConnector/ConnectionHandler");

router.get("/", async (req, res) => {
   connectionToDB.establishConnection();
   //console.log(req.body);
   console.log("HO");

   connectionToDB.closeConnection();
});

module.exports = router;
