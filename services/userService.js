import userSchema from "../model/userModel.js";
import bcrypt from "bcrypt";

export async function getUser() {
  let user = await userSchema.find({});
  return user;
}

export async function addUser(registerUser) {
  const hashedPassword = await bcrypt.hash(registerUser.password, 10);
  if (hashedPassword) {
    const user = await userSchema.create({
      name: registerUser.name,
      email: registerUser.email,
      password: registerUser.password,
      repassword: registerUser.repassword,
    });
    return await user.save();
  } else {
    response.status(500).send({
      message: "Password was not hashed successfully",
    });
  }
  // let createUser = await userSchema.create({
  //     name: registerUser.name,
  //     email: registerUser.email,
  //     password: registerUser.password,
  //     repassword: registerUser.repassword,
  // })
  return createUser;
}
