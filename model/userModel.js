import mongoose from "mongoose";

const registerUser = new mongoose.Schema(
    {
        name: {type: String, required: false},
        email: {type: String, required: [true, "Please provide an Email!"],unique: [true, "Email Exist"]},
        password: {type: String, required: [true, "Please provide a password!"],unique: false},
        repassword: {type: String, required: false},
        date: { type: Date, default: Date.now },
    },{collection: "user"}
)

const userSchema = mongoose.model("user", registerUser)

export default userSchema