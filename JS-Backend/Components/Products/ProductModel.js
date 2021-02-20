const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   quantity: {
      type: Number,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   description: {
      type: String,
   },
});
module.exports = mongoose.model("Products", productsSchema);
