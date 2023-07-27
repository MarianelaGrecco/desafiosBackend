import ERROR_INFO from "./info.js";
import CustomError from "./CustomError.js";

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const errorCode = err.code;
    switch (errorCode) {
      case "PRODUCT_NOT_FOUND":
        res.status(400).json({ error: ERROR_INFO[errorCode] });
        break;
      case "INSUFFICIENT_STOCK":
        res.status(400).json({ error: ERROR_INFO[errorCode] });
        break;
      case "INVALID_QUANTITY":
        res.status(400).json({ error: ERROR_INFO[errorCode] });
        break;
      case "CART_NOT_FOUND":
        res.status(400).json({ error: ERROR_INFO[errorCode] });
        break;
      default:
        res.status(500).json({ error: "Internal Server Error" });
        break;
    }
  } else {
    console.error(err); 
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default errorMiddleware;
