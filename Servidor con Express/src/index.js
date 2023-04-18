import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./productos.txt");

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  res.send(JSON.stringify(products));

  const limit = req.query.limit;
  let result = products;
  if (limit) {
    const limitNumber = parseInt(limit);
    result = products.slice(0, limitNumber);
  }
  res.json(result);
});

app.get("/products/:id", async (req, res) => {
  const products = await productManager.getProductById(req.params.id);
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
