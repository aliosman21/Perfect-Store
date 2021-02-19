const router = require("express").Router();
const globalUtilFunctions = require("./Util/UserUtilFunctions");
const connectionToDB = require("../DBConnector/ConnectionHandler");

router.post("/authenticateLogin", async (req, res) => {
   connectionToDB.establishConnection();

   if (await globalUtilFunctions.checkIfExistInDatabase(req.body.email)) {
      const userData = await globalUtilFunctions.getUserBackFromDatabase(req.body.email);

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
