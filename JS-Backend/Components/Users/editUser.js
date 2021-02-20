const router = require("express").Router();
const usersSchema = require("./RegisterUserModel");
const jwt_decode = require("jwt-decode");
const globalUtilFunctions = require("./Util/UserUtilFunctions");
const connectionToDB = require("../DBConnector/ConnectionHandler");

router.post("/edit", async (req, res) => {
   connectionToDB.establishConnection();
   let responseObject;
   //console.log(req.body);
   let decoded = jwt_decode(req.body.token);

   //console.log(decoded);

   if (await globalUtilFunctions.checkIfExistInDatabase(req.body.email)) {
      responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
         400,
         "Email Already Exists"
      );
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
         modifications.password = req.body.password;
      }
      if (req.body.address) {
         modifications.address = req.body.address;
      }

      console.log(modifications);

      await usersSchema.findByIdAndUpdate(
         userData._id,
         { $set: modifications },
         function (err, model) {
            if (err) res.send({ success: false, message: "Something went wrong" });
            else res.send({ success: true, message: "Updated successfully" });
         }
      );
   }

   connectionToDB.closeConnection();
});

module.exports = router;
