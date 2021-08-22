import Product from "../models/productModal";
import Category from "../models/categoryModal";
import asyncHandler from "express-async-handler";

//@Desc Create Products
//@Route Post/api/products

export const createProducts = asyncHandler(async (req, res) => {
  //CRATE AND UPDATE SECTION
  const categori = await Category.findById(req.body.category);
  if (!categori) {
    res.status(400).send({ msg: "Invalid Category" });
  } else {
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
  }
});

//@Desc Get All products
//@Route Get/api/products
export const getAllProducts = asyncHandler(async (req, res) => {
  //filter by product
  let categories = {};
  if (req.query.categories) {
    categories = { category: req.query.categories.split(",") };
  }

  const products = await Product.find(categories).populate("category");
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
  const product = await Product.findById(req.params.id).populate("category");

  //Check if product is there
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc FETCH Is featured products
//@route Get/api/products/featured/:count
//@access public

export const getFeaturedProduct = asyncHandler(async (req, res) => {
  const paramVal = Number(req.params.count);
  const count = paramVal ? paramVal : 0;
  const products = await Product.find({ isFeatured: true }).limit(count);

  //Check if product is there
  if (products) {
    res.send(products);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});
//@desc FETCH ONE  PRODUCT count
//@route Get/api/products/count
//@access public

export const getProductCount = asyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  //Check if product is there
  if (productCount) {
    res.send({ productCount: productCount });
  } else {
    res.status(404);
    throw new Error("ProductCount not found");
  }
});

//@desc   update product
//@route put/api/products/:id
//@access private, admin

export const updateProduct = asyncHandler(async (req, res) => {
  //CRATE AND UPDATE SECTION
  const categori = await Category.findById(req.body.category);
  if (!categori) {
    res.status(400).send({ msg: "Invalid Category" });
  } else {
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
    let product = await Product.findById(req.params.id);

    if (product) {
      (product.name = name || product.name),
        (product.image = image || product.image),
        (product.brand = brand || product.brand),
        (product.category = category || product.category),
        (product.description = description || product.description),
        (product.richDescription = richDescription || product.richDescription),
        (product.rating = rating || product.rating),
        (product.numReviews = numReviews || product.numReviews),
        (product.isFeatured = isFeatured || product.isFeatured),
        (product.price = price || product.price),
        (product.countInStock = countInStock || product.countInStock);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }
});

//@desc delete product
//@route delete/api/products/:id
//@access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
