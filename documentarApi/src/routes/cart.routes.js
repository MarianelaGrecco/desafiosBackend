import { Router } from "express";
import { cartModel } from "../persistencia/mongoDB/models/cart.model.js";
import { productsModel } from "../persistencia/mongoDB/models/products.model.js";
import {isAdmin, isUser} from "../authorizationMiddlewere.js";
import  ticketService  from "../services/ticket.service.js";
import logger from "../utils/logger.js";


const cartRouter = Router();

//Métodos Mongoose
///Populate
cartRouter.get("/:cid", isUser,async (req, res) => {
  try {
    const cart = await cartModel
      .findById(req.params.cid)
      .populate("products.id_prod");
    res.json(cart);
  } catch (error) {
    logger.error("Error al obtener el carrito:", error);
    res.status(400).send(error);
  }
});

cartRouter.post("/", isUser, async (req, res) => {
  try {
    logger.info("Creando nuevo carrito..."); 
    const newCart = await cartModel.create();
    res.send(newCart);
  } catch (error) {
    logger.error("Error al crear el carrito:", error);
    res.status(400).send(error);
  }
});

cartRouter.post("/:cid/product/:pid", isUser, async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;

    // Busca el carrito por su ID
    const cart = await cartModel.findById(cid);

    // Busca el producto por su ID
    const product = await productsModel.findById(pid);

    // Agrega el producto al carrito
    cart.products.push({ id_prod: pid, cant: quantity });

    // Guarda los cambios en el carrito
    await cart.save();

    res.send(cart);
  } catch (error) {
    logger.error("Error al agregar el producto al carrito:", error);
    res.status(400).send(error);
  }
});

cartRouter.delete("/:cid/products/:pid", isUser, async (req, res) => {
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
    logger.error("Error al eliminar el producto del carrito:", error);
    res.status(400).send(error);
  }
});

cartRouter.put("/:cid", isAdmin, async (req, res) => {
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
    logger.error("Error al actualizar el carrito:", error);
    res.status(400).send(error);
  }
});

cartRouter.put("/:cid/products/:pid", isAdmin, async (req, res) => {
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
    logger.error("Error al actualizar la cantidad del producto en el carrito:", error);
    res.status(400).send(error);
  }
});

cartRouter.delete("/:cid", isAdmin, async (req, res) => {
  try {
    const cid = req.params.cid;
    const removedCart = await cartModel.findByIdAndRemove(cid);
    res.send(removedCart);
  } catch (error) {
    logger.error("Error al eliminar el carrito:", error);
    res.status(400).send(error);
  }
});

//ticket
cartRouter.post("/:cid/purchase", async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Obtener el carrito por su ID
    const cart = await cartModel.findById(cartId).populate("products.id_prod");

    // Array para almacenar los IDs de los productos no procesados
    const unprocessedProductIds = [];

    // Recorre los productos del carrito y verifica el stock
    for (const productItem of cart.products) {
      const { id_prod, cant } = productItem;

      // Verifica si hay suficiente stock para la cantidad indicada
      const product = await productsModel.findById(id_prod);
      if (product.stock >= cant) {
        // Resta el stock del producto
        product.stock -= cant;
        await product.save();
      } else {
        // Agrega el ID del producto no procesado al array
        unprocessedProductIds.push(id_prod.toString());
      }
    }

    // Genera el ticket con los datos de la compra
    const ticket = await ticketService.createTicket(cart.products, req.user);

    // Actualiza el carrito con los productos no procesados
    cart.products = cart.products.filter(
      (productItem) =>
        !unprocessedProductIds.includes(productItem.id_prod.toString())
    );
    await cart.save();

    // Devuelve los IDs de los productos no procesados en la respuesta
    res.json({ unprocessedProductIds, ticketId: ticket._id });
  } catch (error) {
    logger.error("Error al procesar la compra:", error);
    res.status(400).send(error);
  }
});


export default cartRouter;
