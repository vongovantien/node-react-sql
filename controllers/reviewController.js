const db = require("../models");

const Review = db.reviews;

const addReview = async (req, res) => {
  const productId = req.params.id;

  let data = {
    product_id: productId,
    rating: req.body.rating,
    description: req.body.description,
  };

  const review = await Review.create(data);
  res.status(200).send(review);
};

const getAllReview = async (req, res) => {
  const reviews = await Review.findAll({
    order: [["id", "DESC"]],
  });
  res.status(200).send(reviews);
};

module.exports = {
  addReview,
  getAllReview,
};
