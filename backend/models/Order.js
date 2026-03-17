import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String,
      price: Number,
      qty: Number,
      image: String
    }
  ],

  shipping: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },

  totalPrice: Number,

  status: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },

  paymentId: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Order", orderSchema);