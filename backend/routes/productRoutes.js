import express from "express";
import asyncHandler from "express-async-handler";
import { createProducts } from "../controller/productController.js";

const router = express.Router();

router
  .get(
    "/",
    asyncHandler(async (req, res) => {
      res.send("Hi guys and welcome");
    })
  )
  .post("/", createProducts);

export default router;
