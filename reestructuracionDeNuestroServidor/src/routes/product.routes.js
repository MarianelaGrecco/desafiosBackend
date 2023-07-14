import { Router } from "express";
import { productsModel }  from "../persistencia/mongoDB/models/products.model.js";

const productRouter = Router();

//Métodos Mongoose
productRouter.get("/", async (req, res) => {
  try {
    const products = await productsModel.find({}, { __v: 0 });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
productRouter.post("/nuevoProducto", async (req, res) => {
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
    res.status(200).send("Producto creado correctamente");
  } catch (error) {
    res.status(400).send(error);
  }
});
productRouter.get("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const product = await productsModel.findOne(
      { _id: pid },
      { _id: 0, __v: 0 }
    );
    res.status(200).send(product ? product : "El producto no existe");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
productRouter.put("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const modifiedProduct = req.body;
    await productsModel.updateOne({ _id: pid }, modifiedProduct);
    res.status(200).send("El producto se modifico correctamente");
  } catch (error) {
    res.status(200).send(error);
  }
});
productRouter.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    await productModel.deleteOne({ _id: id });
    res.status(200).send("Producto eliminado correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

  /////

productRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productsModel.find();
    res.render("realtimeproducts", { products });
  } catch (error) {
    res.send(error);
  }
});

productRouter.get("/home", async (req, res) => {
  try {
    const products = await productsModel.find();
    res.render("home", { products });
  } catch (error) {
    res.send(error);
  }
});

productRouter.get("/chat", async (req, res) => {
  try {
    const products = await productsModel.find();
    res.render("chat", { products });
  } catch (error) {
    res.send(error);
  }
});

export default productRouter;
