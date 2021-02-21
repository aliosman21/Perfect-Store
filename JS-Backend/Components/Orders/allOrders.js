const router = require("express").Router();
const productsSchema = require("../Products/ProductModel");
const ordersSchema = require("./orderSchema");
const connectionToDB = require("../DBConnector/ConnectionHandler");

router.get("/", async (req, res) => {
   connectionToDB.establishConnection();
   //console.log(req.body);
   try {
      //console.log("HO");
      let response = {};
      let productResponse = [];
      let lastDoc = await ordersSchema.find({}).sort({ _id: -1 });
      //console.log(lastDoc);
      for (doc in lastDoc) {
         //console.log(lastDoc[doc].products);
         let intermediateObject = [];
         for (id in lastDoc[doc].products) {
            const productData = await productsSchema.findOne({
               _id: lastDoc[doc].products[id].productID,
            });
            productData.quantity = lastDoc[doc].products[id].quantity;
            intermediateObject.push(productData);
         }
         if (intermediateObject.length) productResponse.push(intermediateObject);
      }
      response.success = true;
      response.products = productResponse;
      //console.log(response);
      res.send(response);
   } catch {
      response.success = false;
      res.send(response);
   }

   //changed
   connectionToDB.closeConnection();
});

module.exports = router;
