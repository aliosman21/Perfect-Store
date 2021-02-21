const router = require("express").Router();
const productsSchema = require("./ProductModel");
const connectionToDB = require("../DBConnector/ConnectionHandler");

router.post("/", async (req, res) => {
   connectionToDB.establishConnection();
   console.log(req.body);

   let productsInCart = [];
   for (let p in req.body.products) {
      try {
         let lastDoc = await productsSchema.findOne({ _id: req.body.products[p] });
         productsInCart.push(lastDoc);
      } catch {
         res.send({ success: false, message: "something went wrong" });
      }
   }
   console.log(productsInCart);
   res.send({ success: true, products: productsInCart });

   //let lastDoc = await productsSchema.find({}).sort({ _id: -1 }).limit(4);

   connectionToDB.closeConnection();
});

module.exports = router;
