import React, { useEffect, useState } from "react";
import api, { endpoint } from "../configs/api";
import { Card, Button, Form, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState();
  const [description, setDescription] = useState();
  let { productId } = useParams();

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        let { data } = await api.get(endpoint["productDetail"](productId));
        setProduct(data);
        setReviews(data.review);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductDetail();
  }, [productId]);

  const handleDelete = async (productId) => {
    try {
      await api.delete(endpoint["deleteProduct"](productId));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();

    let review = {
      product_id: productId,
      rating: rating,
      description: description,
    };
    
    try {
      await api.post(endpoint.addReview(productId), review);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            {product.description}
            {product.createdAt}
            {product.updatedAt}
          </Card.Text>
          <Link to={`/products/edit/${productId}`}>
            <Button variant="primary">Edit</Button>
          </Link>
          &nbsp;
          <Button variant="danger" onClick={() => handleDelete(productId)}>
            Delete
          </Button>
        </Card.Body>
      </Card>

      <Col md={4} lg={4} sm={4}>
        <h2 className="text-center">Add Review</h2>
        <hr />

        <Form onSubmit={addReviewHandler}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              type="number"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Review
          </Button>
        </Form>

        <br />

        <h5>Product Reviews</h5>
        <hr />

        {reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <p key={review.id}>
                Rating: {review.rating} <br /> {review.description}
              </p>
            );
          })
        ) : (
          <p> No reviews for this product </p>
        )}
      </Col>
    </div>
  );
};

export default ProductDetail;
