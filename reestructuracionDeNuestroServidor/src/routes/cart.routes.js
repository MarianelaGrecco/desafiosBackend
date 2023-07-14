import { Router } from "express";
import { cartModel } from "../persistencia/mongoDB/models/cart.model.js";
import { productsModel } from "../persistencia/mongoDB/models/products.model.js";

// const cartManager = new CartManager("./cart.txt");

const cartRouter = Router();

//Métodos Mongoose
///Populate
cartRouter.get("/:cid", async (req, res) => {
  try {
    const cart = await cartModel
      .findById(req.params.cid)
      .populate("products.id_prod");
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    console.log("Creando nuevo carrito..."); 
    const newCart = await cartModel.create();
    res.send(newCart);
  } catch (error) {
    console.log("Error al crear el carrito:", error);
    res.status(400).send(error);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;

    // Busca el carrito por su ID
    const cart = await cartModel.findById(cid);

    // Busca el producto por su ID
    const product = await productModel.findById(pid);

    // Agrega el producto al carrito
    cart.products.push({ id_prod: pid, cant: quantity });

    // Guarda los cambios en el carrito
    await cart.save();

    res.send(cart);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    // Busca el carrito por su ID
    const cart = await cartModel.findById(cid);

    // Filtra el producto a eliminar por su ID
    cart.products = cart.products.filter(
      (product) => product.product.toString() !== pid
    );

    // Guarda los cambios en el carrito
    await cart.save();

    res.send(cart);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

cartRouter.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = req.body.products;

    const updatedCart = await cartModel.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    );
    res.send(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity;

    // Busca el carrito por su ID
    const cart = await cartModel.findById(cid);

    // Encuentra el índice del producto en el arreglo 'products' del carrito
    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === pid
    );

    // Actualiza la cantidad del producto en el carrito
    cart.products[productIndex].quantity = quantity;

    // Guarda los cambios en el carrito
    await cart.save();

    res.send(cart);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const removedCart = await cartModel.findByIdAndRemove(cid);
    res.send(removedCart);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default cartRouter;
