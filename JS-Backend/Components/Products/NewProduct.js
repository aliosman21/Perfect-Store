const router = require("express").Router();
const productsSchema = require("./ProductModel");
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
   const product = new productsSchema({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.file.path,
   });

   product
      .save()
      .then((result) => {
         console.log(result);
         res.status(200).json({
            message: "Created product successfully",
            createdProduct: {
               name: result.name,
               price: result.price,
               request: {
                  type: "GET",
                  url: "http://localhost:3000/products/" + result.name,
               },
            },
         });
         connectionToDB.closeConnection();
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json({
            error: err,
         });
      });
});

module.exports = router;
