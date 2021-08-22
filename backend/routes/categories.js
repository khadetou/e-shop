import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
} from "../controller/categoryController";
const router = express.Router();

router.get("/category", getAllCategories).post("/category", createCategory);
router
  .get("/category/:id", getCategoryById)
  .delete("/category/:id", deleteCategory);
module.exports = router;
