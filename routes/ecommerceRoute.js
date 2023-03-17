import express from "express"
import fs from "fs"
import myModel from "../model/ecommerseModel.js"

const eCommerce = express.Router();


eCommerce.post("/users", (request, response) => {
    console.log(request.body)
    fs.readFile("./data/products.json", (error, data) => {
      if(error){
        response.status(500).send({messege : error})
      }else {
        let new_products = JSON.parse(data);
        new_products.unshift({...request.body, id: uuidv4()})
        fs.writeFile("./data/products.json", JSON.stringify(new_products), (error) => {
          if(error){
            response.status(500).send({messege : error});
          }else {
            response
            .status(200)
            .send({messege : "Product arrived"});
          }
        })
      }
    })
  });
  
  eCommerce.put("/users/:id", (req, res) => {
    console.log(req.body.productObject)
    fs.readFile("./data/products.json", (err, data) => {
      if(err){
        res.status(500).send({messege: err})
      }else{
        let edits = JSON.parse(data);
        let findData = edits.find((edit) => edit.id === req.params.id)
        edits[edits.indexOf(findData)] = req.body.productObject
        
        fs.writeFile("./data/products.json", JSON.stringify(edits), (err) => {
          if(err){
            res.status(500).send({messege: err})
          }else{
            res
              .status(200)
              .send({messege: "ok" })
          }
        })
      }
    })
  })
  
  eCommerce.delete("/users/:id", (request, response) => {
    console.log(request.body)
    fs.readFile("./data/products.json", (error, data) => {
      if(error){
        response.status(500).send({messege : error})
      }else {
        let new_products = JSON.parse(data);
        new_products = new_products.filter((new_products) => new_products.id !== request.params.id)
        fs.writeFile("./data/products.json", JSON.stringify(new_products), (error) => {
          if(error){
            response.status(500).send({messege : error});
          }else {
            response
            .status(200)
            .send({messege : "Product arrived"});
          }
        })
      }
    })
  });
  
  eCommerce.get("/users", (request, response) => {
      fs.readFile("./data/products.json", (error, data) => {
        if(error){
          response.status(500).send({messege : error})
        }else{
         response.json(JSON.parse(data))
        }
  })})
  
  eCommerce.post("/registerUser", (request, response) => {
    console.log(request.body)
    fs.readFile("./data/register.json", (error, data) => {
      if(error){
        response.status(500).send({messege : error})
      }else {
        let new_products = JSON.parse(data);
        new_products.unshift({...request.body, id: uuidv4()})
        fs.writeFile("./data/register.json", JSON.stringify(new_products), (error) => {
          if(error){
            response.status(500).send({messege : error});
          }else {
            response
            .status(200)
            .send({messege : "Product arrived"});
          }
        })
      }
    })
  });
  
  eCommerce.delete("/registerUser/:id", (request, response) => {
    console.log(request.body)
    fs.readFile("./data/register.json", (error, data) => {
      if(error){
        response.status(500).send({messege : error})
      }else {
        let new_products = JSON.parse(data);
        new_products = new_products.filter((new_products) => new_products.id !== request.params.id)
        fs.writeFile("./data/register.json", JSON.stringify(new_products), (error) => {
          if(error){
            response.status(500).send({messege : error});
          }else {
            response
            .status(200)
            .send({messege : "Product arrived"});
          }
        })
      }
    })
  });
  
  eCommerce.get("/registerUser", (req, res) => {
    fs.readFile("./data/register.json", (err, data) => {
      if(err) {
        res.status(500).send({messege : err})
      }else {
        res.json(JSON.parse(data))
      }
    })
  })


export default eCommerce;