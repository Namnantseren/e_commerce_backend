import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: { type: String, required: true },
    deskription: { type: String, required: true },
    stock: { type: Number, required: false },
    price: Number,
    date: { type: Date, default: Date.now },
    spec: { type: Array, required: false},
    quantity: { type: Number, required: true },
  },
  { collection: "products" }
);

const mySchema = mongoose.model("products", schema)
export default mySchema;
