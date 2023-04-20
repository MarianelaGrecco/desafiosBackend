import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./productos.txt");

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  const limit = req.query.limit;
  let result = products;

  if (limit) {
    const limitNumber = parseInt(limit);
    result = products.slice(0, limitNumber);
  }

  if (result.length === 0) {
    return res.send("No se encontraron productos.");
  } 

  return res.json(result);
});


app.get("/products/:id", async (req, res) => {
  const products = await productManager.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  } else {
    return res.json(product);
  }

});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
