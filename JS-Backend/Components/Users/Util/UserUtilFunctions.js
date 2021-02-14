const passwordHashFunction = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersSchema = require("../RegisterUserModel");

/**
 * Function used to hash the password passed to it
 */
const hashPassword = async (password) => {
   const salt = await generateSaltForHashedPassword();
   const hashedPassword = await passwordHashFunction.hash(password, salt);
   return hashedPassword;
};

/**
 * Function used to generate the salt to
 * Cover the hash password
 */
const generateSaltForHashedPassword = async () => {
   return await passwordHashFunction.genSalt(10);
};

/**
 * Checks if the user exists returns true or false
 */
const checkIfExistInDatabase = async (email) => {
   return (await usersSchema.findOne({ email: email })) ? true : false;
};

/**
 * Check if password is authentic for by comparing
 * the hashes return true or false
 */
const checkIfPasswordIsAuthentic = async (password, validPassword) => {
   return (await passwordHashFunction.compare(password, validPassword)) ? true : false;
};

/**
 *
 * Finds a user in the Database using the email
 * and returns the user data
 */
const getUserBackFromDatabase = async (email) => {
   const userData = await usersSchema.findOne({ email: email });
   return userData;
};

/**
 * Function used to generate a loginToken
 * With the required data inside
 */
const generateLoginToken = async (userData) => {
   const loginToken = jwt.sign(
      { email: userData.email, isAdmin: userData.isAdmin },
      process.env.TOKEN_SECRET
   );
   return loginToken;
};

/**
 * Function used to formulate the response object
 * to be passed back to the client
 */
const appendDataAndCodeToResponseMessage = (statusCode, statusResponse) => {
   const responseObject = {
      statusCode: statusCode,
      statusType: "",
      statusMessage: statusResponse,
   };
   switch (statusCode) {
      case 200:
         responseObject.statusType = "Confirmation";
         break;
      case 400:
         responseObject.statusType = "Error";
         break;
   }
   return responseObject;
};

module.exports = {
   checkIfExistInDatabase: checkIfExistInDatabase,
   hashPassword: hashPassword,
   appendDataAndCodeToResponseMessage: appendDataAndCodeToResponseMessage,
   getUserBackFromDatabase: getUserBackFromDatabase,
   checkIfPasswordIsAuthentic: checkIfPasswordIsAuthentic,
   generateLoginToken: generateLoginToken,
};
