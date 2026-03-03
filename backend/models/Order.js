import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userDetails: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      country: String
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],
    totalAmount: Number,
    paymentStatus: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);