import { promises as fs } from "fs";

const RUTA_ARCHIVO = "./cart.txt";

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  static incrementarID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }

  async getCarts() {
    try {
      const content = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(content);
      return this.carts;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const content = await fs.readFile(this.path, "utf-8");
      const carts = JSON.parse(content);
      const cart = carts.find((cart) => cart.id === id);
      if (cart) {
        return cart;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addCart(cart) {
    try {
      const content = await fs.readFile(this.path, "utf-8");
      const carts = JSON.parse(content);
      const newCart = {
        id: CartManager.incrementarID(),
        products: [],
      };
      carts.push(newCart);
      await fs.writeFile(this.path, JSON.stringify(carts, null, "\t"));
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const content = await fs.readFile(this.path, "utf-8");
      const carts = JSON.parse(content);
      const cart = carts.find((cart) => cart.id === cartId);
      if (cart) {
        const productIndex = cart.products.findIndex(
          (product) => product.id === productId
        );
        if (productIndex !== -1) {
          cart.products[productIndex].quantity += quantity;
        } else {
          cart.products.push({ id: productId, quantity: quantity });
        }
        await fs.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return cart;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
