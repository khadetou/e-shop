import express from "express";
import {
  createProducts,
  getAllProducts,
  getProductById,
} from "../controller/productController.js";

const router = express.Router();

router.get("/products", getAllProducts).post("/products", createProducts);
router.get("/products/:id", getProductById);
module.exports = router;
