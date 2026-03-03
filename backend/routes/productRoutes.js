import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public route (anyone can see products)
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 🔒 Admin only - Add product
router.post(
  "/",
  protect,
  adminOnly,
  async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
  }
);

// 🔒 Get Single Product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// 🔒 Admin only - Delete product
router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  }
);

export default router;