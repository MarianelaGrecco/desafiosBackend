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
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carrito = {
            id: CartManager.incrementarID(),
            cantidad: []
        }
        carts.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito creado"
    }

    async getCartById(id) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        if (carts.some(cart => cart.id === parseInt(id))) {
            return carts.find(cart => cart.id === parseInt(id))
        } else {
            return "Carrito no encontrado"
        }
    }

    async addProductCart(id, quantity, idCart) {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carrito = carts.find(cart => cart.id === parseInt(idCart))
        if (carrito.cantidad.some(product => product.id === parseInt(id))) {
            //Modificar la cantidad
        } else {
            //Crear nuevo objeto con id y quantity y guardarlo en el carrito
        }
        //Consultar el indice del carrito y modificarlo para guardarlo en el txt
    }

}







// import { promises as fs } from "fs";

// const RUTA_ARCHIVO = "./cart.txt";

// export class CartManager {
//   constructor(path) {
//     this.path = path;
//   }

//   static incrementarID() {
//     if (this.idIncrement) {
//       this.idIncrement++;
//     } else {
//       this.idIncrement = 1;
//     }
//     return this.idIncrement;
//   }

//   async getCarts() {
//     try {
//       const content = await fs.readFile(this.path, "utf-8");
//       this.carts = JSON.parse(content);
//       return this.carts;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async getCartById(id) {
//     try {
//       const content = await fs.readFile(this.path, "utf-8");
//       const carts = JSON.parse(content);
//       const cart = carts.find((cart) => cart.id === id);
//       if (cart) {
//         return cart;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async addCart(cart) {
//     try {
//       const content = await fs.readFile(this.path, "utf-8");
//       const carts = JSON.parse(content);
//       const newCart = {
//         id: CartManager.incrementarID(),
//         products: [],
//       };
//       carts.push(newCart);
//       await fs.writeFile(this.path, JSON.stringify(carts, null, "\t"));
//       return newCart;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async addProductToCart(cartId, productId, quantity) {
//     try {
//       const content = await fs.readFile(this.path, "utf-8");
//       const carts = JSON.parse(content);
//       const cart = carts.find((cart) => cart.id === cartId);
//       if (cart) {
//         const productIndex = cart.products.findIndex(
//           (product) => product.id === productId
//         );
//         if (productIndex !== -1) {
//           cart.products[productIndex].quantity += quantity;
//         } else {
//           cart.products.push({ id: productId, quantity: quantity });
//         }
//         await fs.writeFile(this.path, JSON.stringify(carts, null, "\t"));
//         return cart;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
