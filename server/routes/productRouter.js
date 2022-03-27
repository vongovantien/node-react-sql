const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = require("express").Router();

//use routes
router.post(
  "/addProduct",
  productController.upload,
  productController.addProduct
);

router.get("/getAllProduct", productController.getAllProduct);
router.get("/published", productController.getPublishedProduct);

//review routes
router.post("/addReview/:id", reviewController.addReview);
router.get("/allReviews", reviewController.getAllReview);
router.get("/getProductReviews/:id", productController.getProductReviews);

//product routes
router.put("/updateProduct/:id", productController.updateProduct);
router.get("/:id", productController.getOneProduct);
router.delete("/:id", productController.deleteProduct);

//user routes
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
