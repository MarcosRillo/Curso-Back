import mongoose from "mongoose";

const cartCollection = "product";

const cartSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
