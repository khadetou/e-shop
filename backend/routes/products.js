import express from "express";
import {
  createProducts,
  getAllProducts,
  getProductById,
  getProductCount,
  getFeaturedProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

router
  .get("/products", getAllProducts)
  .get("/products/count", getProductCount)
  .post("/products", createProducts);

router
  .get("/products/:id", getProductById)
  .get("/products/featured/:count", getFeaturedProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);
module.exports = router;
