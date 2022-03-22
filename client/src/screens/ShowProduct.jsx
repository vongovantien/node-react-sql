import React, { useState, useEffect } from "react";
import api, { endpoint } from "../configs/api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const ShowProduct = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        let result = await api.get(endpoint["allProduct"]);
        setProduct(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="container row">
        <Button className="btn btn-danger">
          <Link to="/products/addProduct" className="nav-link">
            Add Product
          </Link>
        </Button>
        {product.map((item, index) => (
          <ProductCard product={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default ShowProduct;
