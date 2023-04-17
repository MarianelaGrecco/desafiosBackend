class ProductManager {
  constructor() {
    this.products = [];
    this.currentId = 1; // inicializa el ID actual en 1
  }
  
  addProduct(product) {
    if (
      !product.code ||
      !product.price ||
      product.price <= 0 ||
      product.stock < 0
    ) {
      return "Producto inválido";
    } else if (
      this.products.find((producto) => producto.code == product.code)
    ) {
      return "Producto duplicado";
    } else {
      product.id = this.currentId; // asigna el ID actual al producto
      this.products.push(product);
      this.currentId++; // incrementa el ID actual para el próximo producto
      return "Producto agregado correctamente";
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((producto) => producto.id == id);

    if (product) {
      return product;
    }

    return "Producto no encontrado";
  }
}

class Product {
  constructor(
    title = "",
    description = "",
    price = 0,
    thumbnail = "",
    code = "",
    stock = 0
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
//Terminal
const product1 = new Product(
  "Manzanas",
  "Manzana roja por Kilo",
  250,
  "",
  "M111",
  5
);
const product2 = new Product(
  "Naranjas",
  "Naranja jugo por kilo",
  450,
  "",
  "N222",
  30
);
const product3 = new Product(
  "Pera",
  "Pera dulce por kilo",
  580,
  "",
  "P333",
  20
);
const product4 = new Product("Anana", "por kilo", 580, "", "A444", 20);
const product5 = new Product("Durazno", "por kilo", 567, "", "D555", 50);

const productManager = new ProductManager();
productManager.addProduct(product1);
productManager.addProduct(product3);
productManager.addProduct(product5);

console.log(productManager.getProducts()); // muestra los productos con sus IDs asignados
 ""