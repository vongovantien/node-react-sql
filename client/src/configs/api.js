import axios from "axios";

export let endpoint = {
  allProduct: "products/getAllProduct",
  addProduct: "products/addProduct",
  updateProduct: (productId) => `/products/updateProduct/${productId}`,
  productDetail: (productId) => `/products/getProductReviews/${productId}`,
  deleteProduct: (productId) => `/products/${productId}`,
  addReview: (productId) => `/products/addReview/${productId}}`
};

export default axios.create({
  baseURL: "http://localhost:8080/api/",
});
