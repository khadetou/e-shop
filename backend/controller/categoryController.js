import Category from "../models/categoryModal";
import asyncHandler from "express-async-handler";

//@Desc Create Category
//@Route Post/api/category

export const createCategory = asyncHandler(async (req, res) => {
  //CRATE AND UPDATE SECTION
  const { name, icon, color, image } = req.body;

  const categoryField = {};

  if (name) categoryField.name = name;
  if (image) categoryField.image = image;
  if (color) categoryField.color = color;
  if (icon) categoryField.icon = icon;

  let category = await Category.findOne();

  //CREATE
  category = new Category(categoryField);
  await category.save();
  res.json(category);
});

//@Desc Get All categories
//@Route Get/api/category
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  if (!categories) {
    res.status(404);
    throw new Error("The list of category is empty");
  }

  res.json({ categories });
});

//@desc FETCH ONE SINGLE Category
//@route Get/api/category/:id
//@access public

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  //Check if category is there
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("category not found");
  }
});

//@desc delete category
//@route delete/api/category/:id
//@access Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

//@desc   update Category
//@route put/api/category/:id
//@access private, admin

export const updateCategory = asyncHandler(async (req, res) => {
  //UPDATE
  const { name, icon, color, image } = req.body;
  let category = await Category.findById(req.params.id);

  if (category) {
    (category.name = name || category.name),
      (category.image = image || category.image),
      (category.icon = icon || category.icon),
      (category.color = color || category.color);
  } else {
    res.status(404);
    throw new Error("category not found");
  }

  const updatedcategory = await category.save();
  res.json(updatedcategory);
});
