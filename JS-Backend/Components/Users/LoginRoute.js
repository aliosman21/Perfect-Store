const router = require("express").Router();
const globalUtilFunctions = require("./Util/UserUtilFunctions");
const connectionToDB = require("../DBConnector/ConnectionHandler");

router.post("/authenticateLogin", async (req, res) => {
   connectionToDB.establishConnection();
   let responseObject;
   /**
    * check if the email exists
    */
   if (await globalUtilFunctions.checkIfExistInDatabase(req.body.email)) {
      const userData = await globalUtilFunctions.getUserBackFromDatabase(req.body.email);
      //console.log("User is " + userData);

      /**
       * check if password is correct
       */
      const isValidPass = await globalUtilFunctions.checkIfPasswordIsAuthentic(
         req.body.password,
         userData.password
      );

      /**
       * In case of valid pass parse the object
       * accordingly
       */
      if (isValidPass) {
         responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
            200,
            "User Logged In Successfully"
         );
         /**
          * Create a login token with the information needed inside to pass
          * back to the user and add it to the response object
          */
         const loginToken = await globalUtilFunctions.generateLoginToken(userData);
         responseObject["token"] = loginToken;
         /**
          * In case of non valid pass parse the object
          * accordingly
          */
      } else {
         responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
            400,
            "Error in User's Credentials"
         );
      }
   } else {
      /**
       * The user doesn't exist in the database
       *
       */
      responseObject = globalUtilFunctions.appendDataAndCodeToResponseMessage(
         400,
         "User Doesn't Exist"
      );
   }

   /**
    * Return The response object
    */
   res.status(responseObject.statusCode).send(responseObject);
   connectionToDB.closeConnection();
});
module.exports = router;
