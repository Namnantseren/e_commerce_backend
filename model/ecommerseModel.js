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
  { collection: "e_commerce" }
);

const mySchema = mongoose.model("E_commerse", schema)
export default mySchema;
