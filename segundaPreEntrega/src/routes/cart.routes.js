import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager("./cart.txt");

const cartRouter = Router();

cartRouter.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  res.json(cart);
});

cartRouter.post("/", async (req, res) => {
  const newCart = await cartManager.createCarrito();
  res.send(newCart);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;
  const addedProduct = await cartManager.addProductCart(cid, pid, quantity);
  res.send(addedProduct);
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const removedProduct = await cartManager.removeProductCart(cid, pid);
  res.send(removedProduct);
});

cartRouter.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = req.body.products;
  const updatedCart = await cartManager.updateCart(cid, products);
  res.send(updatedCart);
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity;
  const updatedProduct = await cartManager.updateProductQuantity(cid, pid, quantity);
  res.send(updatedProduct);
});

cartRouter.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const removedCart = await cartManager.removeCart(cid);
  res.send(removedCart);
});

export default cartRouter;


