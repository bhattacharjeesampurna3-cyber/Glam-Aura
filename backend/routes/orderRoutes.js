import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { items, shipping, totalPrice, status } = req.body;

    const order = new Order({
      items,
      shipping,
      totalPrice,
      status: status || "Pending"
    });

    await order.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status;
    if (req.body.paymentId) {
      order.paymentId = req.body.paymentId;
    }

    await order.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;