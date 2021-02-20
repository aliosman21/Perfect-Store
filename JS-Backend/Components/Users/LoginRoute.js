const router = require("express").Router();
const globalUtilFunctions = require("./Util/UserUtilFunctions");
const connectionToDB = require("../DBConnector/ConnectionHandler");
const { response } = require("express");

router.post("/authenticateLogin", async (req, res) => {
   connectionToDB.establishConnection();
   console.log(req.body);
   if (await globalUtilFunctions.checkIfExistInDatabase(req.body.email)) {
      const userData = await globalUtilFunctions.getUserBackFromDatabase(req.body.email);
      console.log(userData);

      const isValidPass = await globalUtilFunctions.checkIfPasswordIsAuthentic(
         req.body.password,
         userData.password
      );
      if (isValidPass) {
         responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
            200,
            "User Logged In Successfully"
         );

         const loginToken = await globalUtilFunctions.generateLoginToken(userData);
         responseObject["token"] = loginToken;
         responseObject["name"] = userData.name;
         responseObject["isAdmin"] = userData.isAdmin;
      } else {
         responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
            400,
            "Error in User's Credentials"
         );
      }
   } else {
      responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
         400,
         "User Doesn't Exist"
      );
   }
   res.status(responseObject.statusCode).send(responseObject);
   connectionToDB.closeConnection();
});
module.exports = router;
