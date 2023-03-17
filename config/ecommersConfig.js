import mongoose from "mongoose";

mongoose
  .connect(
    `mongodb+srv://namka:Zxcvbnmnamka1@cluster0.td37xkh.mongodb.net/e_commerce`
  )
  .then((res) => {
    console.log("connected e_Commerce server");
  }).catch((err)=> {
    console.error("connection failed", err);
  });

export default mongoose.connection
