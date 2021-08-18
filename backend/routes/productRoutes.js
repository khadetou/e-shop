import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send("Hi guys and welcome");
  })
);

export default router;
