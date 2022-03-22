const express = require("express");
const morgan = require('morgan');
const createError = require('http-errors')
require('dotenv').config();
const cors = require("cors"); 
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Hello World",
//       version: "1.0.0",
//     },
//   },
//   servers: [{ url: "http://localhost:8080" }],
//   apis: ["./routes*.js"],
// };

// const spec = swaggerJsDoc(options);
const app = express();

const PORT = process.env.PORT || 8080;

var corOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

//Config middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Config routes
const router = require("./routes/productRouter");
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));
app.use("/api/products", router);

//static image folder
app.use("/images", express.static("./images"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
