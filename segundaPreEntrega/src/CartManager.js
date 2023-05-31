import { promises as fs } from 'fs'

export class CartManager {
  constructor(path) {
    this.path = path
  }

  static incrementarID() {
    if (this.idIncrement) {
      this.idIncrement++
    } else {
      this.idIncrement = 1
    }
    return this.idIncrement
  }

  async createCarrito() {
    try {
      const cartsJSON = await fs.readFile(this.path, 'utf-8')
      const carts = JSON.parse(cartsJSON)
      const carrito = {
        id: CartManager.incrementarID(),
        products: [] // Cambio en la propiedad "product" a "products"
      }

      carts.push(carrito)
      await fs.writeFile(this.path, JSON.stringify(carts))
      return "Carrito creado"
    } catch (error) {
      console.log(error)
    }
  }

  async getCartById(id) {
    try {
      const cartsJSON = await fs.readFile(this.path, 'utf-8')
      const carts = JSON.parse(cartsJSON)
      if (carts.some((cart) => cart.id === parseInt(id))) {
        return carts.find((cart) => cart.id === parseInt(id))
      } else {
        return "Carrito no encontrado"
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addProductCart(idCart, idProduct, quantity) {
    try {
      const cartsJSON = await fs.readFile(this.path, 'utf-8')
      const carts = JSON.parse(cartsJSON)
      const cartIndex = carts.findIndex((cart) => cart.id === parseInt(idCart))
      if (carts[cartIndex].products.some((product) => product.id === parseInt(idProduct))) {
        const productIndex = carts[cartIndex].products.findIndex((product) => product.id === parseInt(idProduct))
        carts[cartIndex].products[productIndex].quantity += parseInt(quantity)
      } else {
        const newProduct = { id: parseInt(idProduct), quantity: parseInt(quantity) }
        carts[cartIndex].products.push(newProduct)
      }
      await fs.writeFile(this.path, JSON.stringify(carts))
      return "Producto agregado al carrito"
    } catch (error) {
      console.log(error)
    }
  }

  async updateCart(id, products) {
    try {
      const cartsJSON = await fs.readFile(this.path, 'utf-8')
      const carts = JSON.parse(cartsJSON)
      const cartIndex = carts.findIndex((cart) => cart.id === parseInt(id))
      if (cartIndex !== -1) {
        carts[cartIndex].products = products
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito actualizado"
      } else {
        return "Carrito no encontrado"
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateProductQuantity(idCart, idProduct, quantity) {
    try {
      const cartsJSON = await fs.readFile(this.path, 'utf-8')
      const carts = JSON.parse(cartsJSON)
      const cartIndex = carts.findIndex((cart) => cart.id === parseInt(idCart))
      if (cartIndex !== -1) {
        const productIndex = carts[cartIndex].products.findIndex((product) => product.id === parseInt(idProduct))
        if (productIndex !== -1) {
          carts[cartIndex].products[productIndex].quantity = parseInt(quantity)
          await fs.writeFile(this.path, JSON.stringify(carts))
          return "Cantidad de producto actualizada"
        } else {
          return "Producto no encontrado en el carrito"
        }
      } else {
        return "Carrito no encontrado"
      }
    } catch (error) {
      console.log(error)
    }
  }

  async removeProductFromCart(idCart, idProduct) {
    try {
      const cartsJSON = await fs.readFile(this.path, 'utf-8')
      const carts = JSON.parse(cartsJSON)
      const cartIndex = carts.findIndex((cart) => cart.id === parseInt(idCart))
      if (cartIndex !== -1) {
        const productIndex = carts[cartIndex].products.findIndex((product) => product.id === parseInt(idProduct))
        if (productIndex !== -1) {
          carts[cartIndex].products.splice(productIndex, 1)
          await fs.writeFile(this.path, JSON.stringify(carts))
          return "Producto eliminado del carrito"
        } else {
          return "Producto no encontrado en el carrito"
        }
      } else {
        return "Carrito no encontrado"
      }
    } catch (error) {
      console.log(error)
    }
  }

  async removeAllProductsFromCart(idCart) {
    try {
      const cartsJSON = await fs.readFile(this.path, 'utf-8')
      const carts = JSON.parse(cartsJSON)
      const cartIndex = carts.findIndex((cart) => cart.id === parseInt(idCart))
      if (cartIndex !== -1) {
        carts[cartIndex].products = []
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Todos los productos eliminados del carrito"
      } else {
        return "Carrito no encontrado"
      }
    } catch (error) {
      console.log(error)
    }
  }
}


