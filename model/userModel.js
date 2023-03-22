import mongoose from "mongoose";

const registerUser = new mongoose.Schema(
    {
        name: {type: String, required: false},
        email: {type: String, required: false},
        password: {type: String, required: false},
        repassword: {type: String, required: false},
        date: { type: Date, default: Date.now },
    },{collection: "user"}
)

const userSchema = mongoose.model("user", registerUser)

export default userSchema