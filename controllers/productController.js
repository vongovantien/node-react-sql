const db = require("../models");

//image upload
const multer = require("multer");
const path = require("path");

//create main model
const Product = db.products;
const Review = db.reviews;

//create new product
const addProduct = async (req, res) => {
  let info = {
    // image: req.file.path,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  try {
    const product = await Product.create(info);
    res.status(200).send(product);
  } catch (error) {
    console.log(err);
  }
};

//get all product
const getAllProduct = async (req, res) => {
  let products = await Product.findAll({
    // attributes: ['price, title']
  });
  res.status(200).send(products);
};

//get one product
const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({
    where: {
      id: id,
    },
  });
  res.status(200).send(product);
};

//get all product published
const getPublishedProduct = async (req, res) => {
  let products = await Product.findAll({
    where: {
      published: true,
    },
  });
  res.status(200).send(products);
};

//update product
const updateProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update(req.body, {
    where: {
      id: id,
    },
  });
  res.status(200).send(product);
};

//delete product
const deleteProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({
    where: {
      id: id,
    },
  });

  await Product.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).send("delete successfully!!");
};

const getProductReviews = async (req, res) => {
  const id = req.params.id;

  const data = await Product.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Review,
        as: "review",
        order: [["review", "createdAt", "DESC"]],
      },
    ],
  });
  res.status(200).send(data);
};

//upload image controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mineType = fileTypes.test(file.minetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mineType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

module.exports = {
  upload,
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getOneProduct,
  getPublishedProduct,
  getProductReviews,
};
