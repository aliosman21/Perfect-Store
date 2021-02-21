const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
   products: [
      {
         productID: { type: String, required: true }, // to do: change to a list
         quantity: { type: String, required: true }, // to do: change to a list
      },
   ],
});
module.exports = mongoose.model("Orders", ordersSchema);
