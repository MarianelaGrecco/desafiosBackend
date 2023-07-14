import { cartService } from "../services/cart.service.js";

export const findCartByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cartService.findCartByUser(userId);
    if (cart) {
      res.status(200).json({ message: "Cart found", cart });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const newCart = await cartService.createCart(userId);
    res.status(201).json({ message: "Cart created", cart: newCart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ message: "Data missing" });
  }
  try {
    const product = { productId, quantity };
    const updatedCart = await cartService.addItemToCart(userId, product);
    res.status(200).json({ message: "Item added to cart", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const updatedCart = await cartService.removeItemFromCart(userId, productId);
    res.status(200).json({ message: "Item removed from cart", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const clearCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedCart = await cartService.clearCart(userId);
    res.status(200).json({ message: "Cart cleared", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error });
  }
};
