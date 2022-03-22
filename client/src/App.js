import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./screens/AddProduct";
import EditProduct from "./screens/EditProduct";
import ProductDetail from "./screens/ProductDetail";
import ShowProduct from "./screens/ShowProduct";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/products/addProduct" element={<AddProduct />} />
          <Route exact path="/" element={<ShowProduct />} />
          <Route exact path="/products/edit/:productId" element={<EditProduct />} />
          <Route exact path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
