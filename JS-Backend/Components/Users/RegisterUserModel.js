const mongoose = require("mongoose");

const userRegisterSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
   },
   email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
   },
   password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
   },
   address: {
      type: String,
      required: true,
      min: 10,
      max: 255,
   },
   isAdmin: {
      type: Boolean,
      required: true,
   },
});
module.exports = mongoose.model("Users", userRegisterSchema);
