import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* =========================
GET PRODUCTS WITH SEARCH
========================= */

router.get("/", async (req, res) => {
  try {

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const products = await Product.find({ ...keyword });

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

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }

});


/* =========================
ADD PRODUCT
========================= */

router.post("/", async (req, res) => {

  try {

    const { name, price, image, images, category, stock, description } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      images,
      category,
      stock,
      description
    });

    res.json(product);

  } catch (error) {

    res.status(500).json({ message: "Add product failed" });

  }

});


/* =========================
DELETE PRODUCT
========================= */

router.delete("/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });

  } catch (error) {

    res.status(500).json({ message: "Delete failed" });

  }

});

export default router;