import { error } from "console";
import EErrors from "./services/errors/enum.js";

export default (error, req, res, next) => {
  console.log(error.cause);
  switch (error.code) {
    case EErrors.PRODUCT_NOT_FOUND:
      res.send({ status: "error", error: error.name });
      break;

    case EErrors.INSUFFICIENT_STOCK:
      res.send({ status: "error", error: error.name });
      break;


      case EErrors.INVALID_QUANTITY:
        res.send({ status: "error", error: error.name });
        break; 

        case EErrors.CART_NOT_FOUND:
            res.send({ status: "error", error: error.name });
            break; 
    default:
      res.send({ status: "error", error: "Unhandeld error" });
  }
};


