import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* =========================
GET PRODUCTS
========================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* =========================
GET PRODUCT BY ID
========================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

/* =========================
ADD PRODUCT (🔥 FINAL FIX)
========================= */
router.post("/", async (req, res) => {

  try {

    console.log("BODY RECEIVED:", req.body); // 🔥 DEBUG

    const {
      name,
      price,
      image,
      images,
      category,
      subcategory,
      shades,
      stock,
      description
    } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      images,
      category,
      subcategory,

      // 🔥 MOST IMPORTANT LINE
      shades: shades || [],

      stock,
      description
    });

    res.json(product);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Add failed" });
  }
});

/* =========================
DELETE PRODUCT
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;