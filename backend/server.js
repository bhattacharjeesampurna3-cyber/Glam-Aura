import dotenv from "dotenv";
dotenv.config();

console.log("KEY:", process.env.RAZORPAY_KEY_ID);


import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);