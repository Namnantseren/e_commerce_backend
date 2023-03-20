import mySchema from "../model/productModel.js";

export async function getProduct(){
    let findProd = await mySchema.find({})
    console.log('findProd :' ,findProd);
    return findProd;
}

export async function postProduct() {
    let createProd = await mySchema.create();
    console.log("createProd: ", createProd);
    return createProd
}