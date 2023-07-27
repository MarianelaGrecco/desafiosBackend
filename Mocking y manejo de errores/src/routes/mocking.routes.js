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

// mockingRouter.post("/", (req, res) => {
//     const { title, type, required, description, code, category, price, stock, status } = req.body;
  
   
//     if (!title || typeof title !== "string") {
//       const errorMessage = ERROR_INFO.PRODUCT_TITLE_INVALID.replace("{productTitle}", title);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  
  
//     if (!type || typeof type !== "string") {
//       const errorMessage = ERROR_INFO.PRODUCT_TYPE_INVALID.replace("{productType}", type);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  
   
//     if (typeof required !== "boolean") {
//       const errorMessage = ERROR_INFO.PRODUCT_REQUIRED_INVALID.replace("{productRequired}", required);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  
   
//     if (description && typeof description !== "string") {
//       const errorMessage = ERROR_INFO.PRODUCT_DESCRIPTION_INVALID.replace("{productDescription}", description);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  
   
//     if (code && typeof code !== "string") {
//       const errorMessage = ERROR_INFO.PRODUCT_CODE_INVALID.replace("{productCode}", code);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  
 
//     if (category && typeof category !== "string") {
//       const errorMessage = ERROR_INFO.PRODUCT_CATEGORY_INVALID.replace("{productCategory}", category);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  

//     if (price && typeof price !== "number") {
//       const errorMessage = ERROR_INFO.PRODUCT_PRICE_INVALID.replace("{productPrice}", price);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  
  
//     if (stock && typeof stock !== "number") {
//       const errorMessage = ERROR_INFO.PRODUCT_STOCK_INVALID.replace("{productStock}", stock);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  
    
//     if (status && !["available", "out of stock"].includes(status)) {
//       const errorMessage = ERROR_INFO.PRODUCT_STATUS_INVALID.replace("{productStatus}", status);
//       res.status(400).json({ error: errorMessage });
//       return;
//     }
  
   
//     const product = {
//       title,
//       type,
//       required,
//       description,
//       code,
//       category,
//       price,
//       stock,
//       status,
//     };
   
//     res.json({ status: "success", payload: product });
//   });
  


export default mockingRouter