import { Router } from "express";
import {generateProduct} from "../utils/generateProduct.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";

const mockingRouter = Router()

mockingRouter.get('/', async (req, res) => {
    const product= []
    for(let i=0;i<100;i++){
        product.push(generateProduct())
    }
    res.json({status:"success", playload:product})
})

mockingRouter.post("/", (req, res) => {
    const { title, type, required, description, code, category, price, stock, status } = req.body;
    if(!title || !type || !required || !description || !code || !category || !price || !stock || !status ){
        CustomError.createError({
            name:"User creation error",
            cause:generateProductErrorInfo({title, type, required, description, code, category, price, stock, status}),
            message: "Error Trying to create Product",
            code:EErrors.PRODUCT_NOT_FOUND
        })
    }
    const product = {
              title,
              type,
              required,
              description,
              code,
              category,
              price,
              stock,
              status,
            }
            if(product.length===0){
                userRouter.id = 1;
            }else{
                product.id = product[product.length-1].id+1;
            }
            product.push(product);
            res.send({status:"succes",playload:product})
        })


export default mockingRouter