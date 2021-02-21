const router = require("express").Router();
const productsSchema = require("./ProductModel");
const jwt_decode = require("jwt-decode");
const connectionToDB = require("../DBConnector/ConnectionHandler");
const multer = require("multer");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./uploads/");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const fileFilter = (req, file, cb) => {
   // reject a file
   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
   } else {
      cb(null, false);
   }
};

const upload = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 5,
   },
   fileFilter: fileFilter,
});

router.post("/", upload.single("image"), async (req, res) => {
   connectionToDB.establishConnection();
   console.log(req.body);
   let decoded = jwt_decode(req.body.token);
   console.log(decoded);
   console.log(req.body);
   //console.log(req.body);
   if (decoded.isAdmin) {
      const product = new productsSchema({
         name: req.body.name,
         quantity: req.body.quantity,
         description: req.body.description,
         price: req.body.price,
         image: "http://localhost:5000/" + req.file.path,
      });
      console.log(product);

      product
         .save()
         .then((result) => {
            console.log(result);
            res.status(200).json({
               success: true,
               message: "Created product successfully",
               createdProduct: {
                  name: result.name,
                  price: result.price,
               },
            });
            connectionToDB.closeConnection();
         })
         .catch((err) => {
            console.log(err);
            res.status(500).json({
               success: false,
               error: err,
            });
         });
   } else {
      res.send({ success: false, message: "Access Denied" });
   }
});

module.exports = router;
