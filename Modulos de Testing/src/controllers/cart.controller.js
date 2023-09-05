import { cartService } from "../services/cart.service.js";
import logger from "../utils/logger.js";

export const findCartByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cartService.findCartByUser(userId);
    if (cart) {
      logger.info("Cart found for user:", userId);
      res.status(200).json({ message: "Cart found", cart });
    } else {
      logger.warning("Cart not found for user:", userId);
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    logger.error("Error finding cart for user:", userId, error);
    res.status(500).json({ error });
  }
};

export const createCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const newCart = await cartService.createCart(userId);
    logger.info("Cart created for user:", userId);
    res.status(201).json({ message: "Cart created", cart: newCart });
  } catch (error) {
    logger.error("Error creating cart for user:", userId, error);
    res.status(500).json({ error });
  }
};

export const addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    logger.warning("Data missing for adding item to cart:", req.body);
    return res.status(400).json({ message: "Data missing" });
  }
  try {
    const product = { productId, quantity };
    const updatedCart = await cartService.addItemToCart(userId, product);
    logger.info("Item added to cart for user:", userId, product);
    res.status(200).json({ message: "Item added to cart", cart: updatedCart });
  } catch (error) {
    logger.error("Error adding item to cart for user:", userId, product, error);
    res.status(500).json({ error });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const updatedCart = await cartService.removeItemFromCart(userId, productId);
    logger.info("Item removed from cart for user:", userId, productId);
    res.status(200).json({ message: "Item removed from cart", cart: updatedCart });
  } catch (error) {
    logger.error("Error removing item from cart for user:", userId, productId, error);
    res.status(500).json({ error });
  }
};

export const clearCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedCart = await cartService.clearCart(userId);
    logger.info("Cart cleared for user:", userId);
    res.status(200).json({ message: "Cart cleared", cart: updatedCart });
  } catch (error) {
    logger.error("Error clearing cart for user:", userId, error);
    res.status(500).json({ error });
  }
};

