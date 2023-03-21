import mySchema from "../model/productModel.js";

export async function getProduct() {
  let findProd = await mySchema.find({});
  return findProd;
}

export async function postProduct(product) {
  let createProd = await mySchema.create({
    name: product.name,
    image: product.image,
    stock: product.price,
    sale: product.stock,
    category: product.category,
  });
  console.log("createProd: ", createProd);
  return createProd;
}
