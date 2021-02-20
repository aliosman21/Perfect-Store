const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

//Function to verify the token of the user it doesn't verify its clearance level
module.exports = function (req, res, next) {
   const token = req.body.token;
   console.log(req.body);
   if (!token) return res.send({ success: false, message: "Access denied" });

   try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      let decoded = jwt_decode(req.body.token);
      console.log(decoded);
      req.user = verified;
      next();
   } catch (err) {
      res.send({ success: false, message: "Invalid Token" });
   }
};
