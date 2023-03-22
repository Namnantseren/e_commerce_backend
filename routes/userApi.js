import  express  from "express";
import { addUser, getUser } from "../services/userService.js";

const user = express.Router()

// user.post("/user", async (request, response) => {
//     let postedUser = await addUser(request.body)
//     response.status(200).send(postedUser)
// });

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