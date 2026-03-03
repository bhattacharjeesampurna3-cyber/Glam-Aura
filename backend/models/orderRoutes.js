import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

export default router;