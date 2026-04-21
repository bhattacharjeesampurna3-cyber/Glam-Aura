import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String
});

// 🔥 SHADE SCHEMA
const shadeSchema = new mongoose.Schema({
  name: String,
  color: String,
  image: String
});

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  images: {
    type: [String],
    default: []
  },

  category: {
    type: String,
    required: true
  },

  // 🔥 NEW
  subcategory: {
    type: String,
    default: ""
  },

  // 🔥 THIS WAS MISSING (MAIN FIX)
  shades: {
    type: [shadeSchema],
    default: []
  },

  description: {
    type: String,
    default: ""
  },

  stock: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 0
  },

  numReviews: {
    type: Number,
    default: 0
  },

  reviews: [reviewSchema]

});

export default mongoose.model("Product", productSchema);