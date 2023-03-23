import  express  from "express";
import { addUser, getUser } from "../services/userService.js";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import userSchema from "../model/userModel.js";

const user = express.Router()

// user.post("/user", async (request, response) => {
//     let postedUser = await addUser(request.body)
//     response.status(200).send(postedUser)
// });

user.post("/login", async(req, res) => {
  try {
    const {email, password} = req.body;
    if(!(email && password)) {
      res.status(400).json(
        {
          success: false,
          status: "Email or password is incorrect",
          email: email,
          password: password,
        })
      return;
    }
    const loginUser = await userSchema.findOne({email});
    if(loginUser && (await bcrypt.compare(password, loginUser.password))) {
      const token = jwt.sign(
        {user_id: loginUser._id, email},"MySuperDuperHolyCow",{expiresIn: "5m"}
      );res.status(200).json(
        {
          success: true,
          status: "User successfully loged in",
          email: email,
          data: loginUser,
          token: token
        }
      );
      return;
    }res.status(400).json({status: "Email or password doesn't matched"})
  }catch(err){
    console.log(err);
  }
})

user.post("/user", async (req, res) => {
    if (req.body.email && req.body.password) {
      const result = await addUser(req.body);
      console.log("result:", result);
      if (result) {
        res.status(201).send({
          message: "User Created Successfully",
          result,
        });
      } else {
        res.status(500).send({
          message: "Error creating user",
        });
      }
    }
  });


user.get("/user", async (req, res) => {
  const userGet = await getUser(req.body)
  res.status(200).send(userGet)
  console.log("user",userGet);
})


export default user