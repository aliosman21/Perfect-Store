const router = require("express").Router();
const ordersSchema = require("./orderSchema");

const connectionToDB = require("../DBConnector/ConnectionHandler");

router.post("/", async (req, res) => {
   connectionToDB.establishConnection();
   //console.log(req.body.products);
   let orders = [];

   for (p in req.body.products) {
      let productInOrder = {};
      productInOrder.productID = req.body.products[p].id;
      productInOrder.quantity = req.body.products[p].quantity;
      orders.push(productInOrder);
   }
   //console.log(orders);
   const order = new ordersSchema({
      products: orders,
   });
   console.log(order);

   order
      .save()
      .then((result) => {
         //console.log(result);
         res.status(200).json({
            success: true,
            message: "Created order successfully",
         });
         connectionToDB.closeConnection();
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({
            success: false,
            message: "error happened",
         });
      });
});

module.exports = router;
