import Product from "../models/productModal.js";
import asyncHandler from "express-async-handler";

export const createProducts = asyncHandler(async (req, res) => {
  //CRATE AND UPDATE SECTION
  const { name, image, countInStock } = req.body;

  const productField = {};

  if (name) productField.name = name;
  if (image) productField.image = image;
  if (countInStock) productField.countInStock = countInStock;

  let product = await Product.findOne();

  //CREATE
  product = new Product(productField);
  await product.save();
  res.json(product);
});
