import Product from "../models/productModal";
import Category from "../models/categoryModal";
import asyncHandler from "express-async-handler";

//@Desc Create Products
//@Route Post/api/products

export const createProducts = asyncHandler(async (req, res) => {
  //CRATE AND UPDATE SECTION
  const categori = Category.findById(req.body.id);
  if (!categori) res.status(400).json({ msg: "Invalid Category" });
  const {
    name,
    image,
    brand,
    description,
    richDescription,
    category,
    reviews,
    rating,
    numReviews,
    price,
    countInStock,
    isFeatured,
  } = req.body;

  const productField = {};

  if (name) productField.name = name;
  if (image) productField.image = image;
  if (brand) productField.brand = brand;
  if (description) productField.description = description;
  if (richDescription) productField.richDescription = richDescription;
  if (category) productField.category = category;
  if (rating) productField.rating = rating;
  if (numReviews) productField.numReviews = numReviews;
  if (price) productField.price = price;
  if (countInStock) productField.countInStock = countInStock;
  if (isFeatured) productField.isFeatured = isFeatured;

  let product = await Product.findOne();

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
