import React, { useState } from "react";
import { Container, Form, Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api, { endpoint } from "../configs/api";
const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const navigate = useNavigate()
  const addProductHandler = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      price: price,
      description: description,
      published: published,
    };
    console.log(data);
    try {
      await api.post(endpoint["addProduct"], data);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <h1 className="text-center text-info">Add Product</h1>
        <hr />
        <Form onSubmit={addProductHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Published</Form.Label>
            <Form.Check
              value={published}
              onChange={() => setPublished(!published)}
              type="checkbox"
              label="Check me"
            />
          </Form.Group>

          <Button variant="primary" type="Submit">
            Add Product
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddProduct;
