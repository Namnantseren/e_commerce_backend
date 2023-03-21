import express from "express";
import fs from "fs";
import { nanoid } from "nanoid";
import { getProduct, postProduct } from "../services/productService.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const eCommerce = express.Router();

// eCommerce.post("/products", async (request, response) => {
//   let postedProduct = await postProduct(request.body);
//   response.status(200).send(postedProduct);
//   console.log('product: ', request.body);
// });

eCommerce.get("/products", async (request, response) => {
  const query = request.query;
  const result = await getProduct(query.name);
  response.status(200).send(result);
});

//image------

const storage = multer.diskStorage({
  destination: (rq, file, cb) => {
    cb(null, "/tmp");
  },
  filename: (rq,file, cb) => {
    // const ext = extractExtansion(file.originalname);
    // const newName = nanoid() + '+' + ext;
    cb(null, file.originalname);
  }
})

// const extractExtansion = (name) => {
//   const splitted = name.split(".");
//   return splitted[splitted.lenght - 1];
// }

const upload = multer({storage: storage})

eCommerce.post("/products", upload.single("file"), 
  async (req, res) => {
    const {secure_url} = await cloudinary.uploader.upload(req.file.path, {folder: "Product"})
    const newProduct = { image: secure_url, ...JSON.parse(req.body.object)};
    const result = await postProduct(newProduct);
    res.status(200).send(result)
  }
)

// eCommerce.post("/registerUser", (request, response) => {
//   console.log(request.body)
//   fs.readFile("./data/register.json", (error, data) => {
//     if(error){
//       response.status(500).send({messege : error})
//     }else {
//       let new_products = JSON.parse(data);
//       new_products.unshift({...request.body, id: uuidv4()})
//       fs.writeFile("./data/register.json", JSON.stringify(new_products), (error) => {
//         if(error){
//           response.status(500).send({messege : error});
//         }else {
//           response
//           .status(200)
//           .send({messege : "Product arrived"});
//         }
//       })
//     }
//   })
// });

// eCommerce.delete("/registerUser/:id", (request, response) => {
//   console.log(request.body)
//   fs.readFile("./data/register.json", (error, data) => {
//     if(error){
//       response.status(500).send({messege : error})
//     }else {
//       let new_products = JSON.parse(data);
//       new_products = new_products.filter((new_products) => new_products.id !== request.params.id)
//       fs.writeFile("./data/register.json", JSON.stringify(new_products), (error) => {
//         if(error){
//           response.status(500).send({messege : error});
//         }else {
//           response
//           .status(200)
//           .send({messege : "Product arrived"});
//         }
//       })
//     }
//   })
// });

// eCommerce.get("/registerUser", (req, res) => {
//   fs.readFile("./data/register.json", (err, data) => {
//     if(err) {
//       res.status(500).send({messege : err})
//     }else {
//       res.json(JSON.parse(data))
//     }
//   })
// })

export default eCommerce;
