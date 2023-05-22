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
            product: [{id:1, quantity:5}]
        }

        carts.push(carrito)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito creado"  
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        try{
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        if (carts.some(cart => cart.id === parseInt(id))) {
            return carts.find(cart => cart.id === parseInt(id))
        } else {
            return "Carrito no encontrado"
        }
    }catch (error) {
        console.log(error);
    }
}
async addProductCart(id, quantity, idCart) {
    try {
        const cartsJSON = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartsJSON)
        const carritoIndex = carts.findIndex(cart => cart.id === parseInt(idCart))
        if (carts[carritoIndex].product.some(product => product.id === parseInt(id))) {
            const productIndex = carts[carritoIndex].product.findIndex(product => product.id === parseInt(id))
            carts[carritoIndex].product[productIndex].quantity += parseInt(quantity)
        } else {
            const newProduct = {id: parseInt(id), quantity: parseInt(quantity)}
            carts[carritoIndex].product.push(newProduct)
        }
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Producto agregado al carrito"
    } catch (error) {
        console.log(error);
    }
}
}

