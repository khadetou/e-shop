import Product from "../models/productModal.js";
import asyncHandler from "express-async-handler";

//@Desc Create Products
//@Route Post/api/products

export const createProducts = asyncHandler(async (req, res) => {
  //CRATE AND UPDATE SECTION
  const {
    name,
    image,
    brand,
    description,
    reviews,
    rating,
    numReviews,
    price,
    countInStock,
  } = req.body;

  console.log(req.category);
  const productField = {};
  productField.user = req.category.id;

  if (name) productField.name = name;
  if (image) productField.image = image;
  if (brand) productField.brand = brand;
  if (description) productField.description = description;
  if (rating) productField.rating = rating;
  if (numReviews) productField.numReviews = numReviews;
  if (price) productField.price = price;
  if (countInStock) productField.countInStock = countInStock;

  let product = await Product.findOne({ category: req.category.id });

  //CREATE
  product = new Product(productField);
  await product.save();
  res.json(product);
});

//@Desc Get All products
//@Route Get/api/products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) {
    res.status(404);
    throw new Error("The list of products is empty");
  }

  res.json({ products });
});

//@desc FETCH ONE SINGLE PRODUCT
//@route Get/api/products
//@access public

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  //Check if product is there
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
