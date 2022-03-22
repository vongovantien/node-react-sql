import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Card
        className="shadow-lg m-2 m-3 rounded col-md-6"
        style={{ width: "18rem" }}
      >
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>Title: {product.title}</Card.Title>
          <Card.Title>Price ${product.price}</Card.Title>
          <Card.Text>Description: {product.description}</Card.Text>
          <Link to={`/products/${product.id}/`}>
            <Button variant="primary">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
