const router = require("express").Router();
const usersSchema = require("./RegisterUserModel");
const jwt_decode = require("jwt-decode");
const globalUtilFunctions = require("./Util/UserUtilFunctions");
const connectionToDB = require("../DBConnector/ConnectionHandler");

router.patch("/edit", async (req, res) => {
   connectionToDB.establishConnection();
   let responseObject;
   //console.log(req.body);
   let decoded = jwt_decode(req.body.token);

   //console.log(decoded);

   if (await globalUtilFunctions.checkIfExistInDatabase(req.body.email)) {
      res.send({ success: false, message: "email already exists" });
   } else {
      const userData = await globalUtilFunctions.getUserBackFromDatabase(decoded.email);
      console.log("USERDATA");
      console.log(userData);
      let modifications = {};
      if (req.body.name) {
         modifications.name = req.body.name;
      }
      if (req.body.email) {
         modifications.email = req.body.email;
      }
      if (req.body.password) {
         const password = await globalUtilFunctions.hashPassword(req.body.password);
         //hashed password
         modifications.password = password;
      }
      if (req.body.address) {
         modifications.address = req.body.address;
      }

      console.log(modifications);

      await usersSchema.findByIdAndUpdate(userData._id, { $set: modifications });
      // await usersSchema.findOneAndDelete(userData._id).remove().exec();
      res.send({ success: true, message: "done" });
   }

   connectionToDB.closeConnection();
});

module.exports = router;
