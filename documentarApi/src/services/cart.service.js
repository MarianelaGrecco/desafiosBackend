import { cartMongo } from "../persistencia/DAOs/MongoDAOs/cartMongo.js";

class CartService {
  async findCartByUser(userId) {
    try {
      const cart = await cartMongo.findOne({ userId });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async createCart(userId) {
    try {
      const newCart = await cartMongo.create({ userId, products: [] });
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async addItemToCart(userId, product) {
    try {
      const cart = await cartMongo.findOne({ userId });
      cart.products.push(product);
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async removeItemFromCart(userId, productId) {
    try {
      const cart = await cartMongo.findOne({ userId });
      cart.products = cart.products.filter((product) => product.productId !== productId);
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async clearCart(userId) {
    try {
      const cart = await cartMongo.findOne({ userId });
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

export const cartService = new CartService();
