import { Router } from "express";
import  productsModel  from "../persistencia/mongoDB/models/products.model.js";
import { isAdmin } from "../authorizationMiddlewere.js";
import logger from "../utils/logger.js";

const productsRouter = Router();

// Métodos Mongoose
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsModel.find({}, { __v: 0 });
    res.status(200).send(products);
  } catch (error) {
    logger.error("Error fetching products:", error);
    res.status(400).send(error);
  }
});

productsRouter.post("/nuevoProducto", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      status,
      code,
      category,
      stock,
    } = req.body;
    await productsModel.create({
      title,
      description,
      price,
      thumbnail,
      category,
      status,
      code,
      stock,
    });
    logger.info("Product created successfully");
    res.status(200).send("Producto creado correctamente");
  } catch (error) {
    logger.error("Error creating product:", error);
    res.status(400).send(error);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const product = await productsModel.findOne({ _id: pid }, { _id: 0, __v: 0 });
    if (product) {
      logger.info("Product found:", product);
      res.status(200).send(product);
    } else {
      logger.warn("Product not found with ID:", pid);
      res.status(200).send("El producto no existe");
    }
  } catch (error) {
    logger.error("Error fetching product:", error);
    res.status(400).send(error);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const modifiedProduct = req.body;
    await productsModel.updateOne({ _id: pid }, modifiedProduct);
    logger.info("Product updated successfully");
    res.status(200).send("El producto se modificó correctamente");
  } catch (error) {
    logger.error("Error updating product:", error);
    res.status(200).send(error);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    await productsModel.deleteOne({ _id: id });
    logger.info("Product deleted successfully");
    res.status(200).send("Producto eliminado correctamente");
  } catch (error) {
    logger.error("Error deleting product:", error);
    res.status(400).send(error);
  }
});

// Otras rutas de visualización
productsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productsModel.find();
    res.render("realtimeproducts", { products });
  } catch (error) {
    logger.error("Error rendering realtimeproducts view:", error);
    res.send(error);
  }
});

productsRouter.get("/home", async (req, res) => {
  try {
    const products = await productsModel.find();
    res.render("home", { products });
  } catch (error) {
    logger.error("Error rendering home view:", error);
    res.send(error);
  }
});

productsRouter.get("/chat", async (req, res) => {
  try {
    const products = await productsModel.find();
    res.render("chat", { products });
  } catch (error) {
    logger.error("Error rendering chat view:", error);
    res.send(error);
  }
});

export default productsRouter;
