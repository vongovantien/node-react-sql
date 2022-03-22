const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /getAllProduct:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

//use routes
router.post(
  "/addProduct",
  productController.upload,
  productController.addProduct
);

router.get("/getAllProduct", productController.getAllProduct);
router.get("/published", productController.getPublishedProduct);

//review routes
router.post("/addReview", reviewController.addReview);
router.get("/allReviews", reviewController.getAllReview);
router.get("/getProductReviews/:id", productController.getProductReviews);

//product routes
router.put("/updateProduct/:id", productController.updateProduct);
router.get("/:id", productController.getOneProduct);
router.delete("/:id", productController.deleteProduct);

//user routes
router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = router;
