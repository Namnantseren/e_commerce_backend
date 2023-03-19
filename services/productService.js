import mySchema from "../model/productModel.js";

export async function getProduct(){
    let findProd = await mySchema.find({})
    console.log('findProd :' ,findProd);
    return findProd;
}
