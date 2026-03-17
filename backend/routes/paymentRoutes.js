import express from "express";
import razorpay from "../config/razorpay.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {

  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

export default router;