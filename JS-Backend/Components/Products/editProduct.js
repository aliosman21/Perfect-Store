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

router.patch("/", upload.single("image"), async (req, res) => {
   connectionToDB.establishConnection();
   const productData = await productsSchema.findOne({ _id: req.body.id });
   let modifications = {};

   if (productData) {
      console.log("Found him");
      if (req.body.name) {
         modifications.name = req.body.name;
      }
      if (req.body.quantity) {
         modifications.quantity = req.body.quantity;
      }
      if (req.body.description) {
         //hashed password
         modifications.description = req.body.description;
      }
      if (req.body.price) {
         modifications.price = req.body.price;
      }
      try {
         if (req.file.path) {
            modifications.image = "http://localhost:5000/" + req.file.path;
         }
      } catch {
         console.log("no image");
      }

      await productsSchema.findByIdAndUpdate(productData._id, { $set: modifications });

      res.send({ success: true, message: "Product Updated" });
   } else {
      console.log("NOT FOUND");
      res.send({ success: false, message: "Something went wrong" });
   }

   connectionToDB.closeConnection();
});

module.exports = router;
