const router = require("express").Router();
const usersSchema = require("./RegisterUserModel");
const globalUtilFunctions = require("./Util/UserUtilFunctions");
const connectionToDB = require("../DBConnector/ConnectionHandler");

router.post("/addUser", async (req, res) => {
   //establish a connection to the database
   connectionToDB.establishConnection();
   let responseObject;

   //if Email exists response with error status code,type and an error message
   //else continues
   if (await globalUtilFunctions.checkIfExistInDatabase(req.body.email)) {
      responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
         400,
         "Email Already Exists"
      );
   } else {
      //encrypt password to save the hash to the database
      const password = await globalUtilFunctions.hashPassword(req.body.password);
      /**
       * create new DTO with the schema we have
       * By default isAdmin is set to false because
       * Admins cannot be registered
       * */

      const user = new usersSchema({
         name: req.body.name,
         email: req.body.email,
         password: password,
         address: req.body.address,
         isAdmin: false,
      });
      try {
         //Attempt to save the user to the database
         const savedUser = await user.save();
         console.log("User saved");

         responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
            200,
            "User Saved Successfully"
         );
      } catch (err) {
         console.log(err);
         //in case of error send back a message with the error
         responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
            400,
            "Error Fields Error"
         );
      }
   }
   res.status(responseObject.statusCode).send(responseObject);
   connectionToDB.closeConnection();
});

module.exports = router;
