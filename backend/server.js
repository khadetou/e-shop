import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const { PORT, NODE_ENV } = process.env;

connectDB();

app.use(express.json({ extended: false }));

//Show us the actions that we hit
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productRoutes);

//Middlewares
app.use(notFound);
app.use(errorHandler);

//SETTING THE PORT
const PORTV = PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${NODE_ENV} mode on port ${PORTV}`.bold.green
  )
);
