
import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import api, { endpoint } from "../configs/api";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const getProductById = async () => {
      const {data} = await api.get(endpoint.productDetail(productId));
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      setPublished(data.published);
    };

    getProductById();
  }, [productId]);

  const updateProductHandler = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      price: price,
      description: description,
      published: published,
    };

    try {
      await api.put(endpoint.updateProduct(productId), data);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-5 p-2">
        <h1>Update Product</h1>
        <hr />

        <Form onSubmit={updateProductHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Published</Form.Label>
            <Form.Check
              checked= {published}
              onChange={() => setPublished(!published)}
              type="checkbox"
              label="Check me"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditProduct;
