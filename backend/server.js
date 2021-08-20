import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import colors from "colors";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
const morgan = require("morgan");

dotenv.config();
const app = express();
const { PORT, NODE_ENV } = process.env;

connectDB();

app.use(express.json({ extended: false }));

//Show us the actions that we hit
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Autoload all the routes files
fs.readdirSync("./backend/routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

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
