import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: { type: String, required: false },
    description: { type: String, required: false },
    stock: { type: Number, required: false },
    price: {type: Number, required: false},
    date: { type: Date, default: Date.now },
    spec: { type: Array, required: false},
    quantity: { type: Number, required: false },
    category: String,
  },
  { collection: "products" }
);

const mySchema = mongoose.model("products", schema)
export default mySchema;
