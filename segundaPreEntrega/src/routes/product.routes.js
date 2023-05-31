import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager("./productos.txt");

const productRouter = Router();

const ITEMS_PER_PAGE = 10;

productRouter.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || ITEMS_PER_PAGE;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort || "";
  const query = req.query.query || "";
  const category = req.query.category || "";
  const availability = req.query.availability || "";

  const options = {
    limit: limit,
    skip: (page - 1) * limit,
  };

  let filters = {};

  if (category) {
    filters.category = category;
  }
  
  if (availability) {
    filters.availability = availability;
  }

  let products = await productManager.getProducts(filters, options);

  const totalItems = await productManager.countProducts(filters);
  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const prevPage = hasPrevPage ? page - 1 : null;
  const nextPage = hasNextPage ? page + 1 : null;

  let prevLink = null;
  let nextLink = null;

  if (hasPrevPage) {
    prevLink = `/products?page=${prevPage}&limit=${limit}&sort=${sort}&query=${query}&category=${category}&availability=${availability}`;
  }

  if (hasNextPage) {
    nextLink = `/products?page=${nextPage}&limit=${limit}&sort=${sort}&query=${query}&category=${category}&availability=${availability}`;
  }

  if (sort === "asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    products.sort((a, b) => b.price - a.price);
  }

  const response = {
    status: "success",
    payload: products,
    totalPages: totalPages,
    prevPage: prevPage,
    nextPage: nextPage,
    page: page,
    hasPrevPage: hasPrevPage,
    hasNextPage: hasNextPage,
    prevLink: prevLink,
    nextLink: nextLink,
  };

  res.send(JSON.stringify(response));
});

productRouter.post("/nuevoProducto", async (req, res) => {
  const { title, description, price, thumbnail, status, code, stock } = req.body;
  await productManager.addProduct({
    title,
    description,
    price,
    thumbnail,
    status,
    code,
    stock,
  });
  res.redirect('/');
});

productRouter.get ("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realtimeproducts', { products });
  } catch (error) {
    res.send(error);
  }
});

productRouter.get ("/home", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    res.send(error);
  }
});

productRouter.get ("/chat", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('chat', { products });
  } catch (error) {
    res.send(error);
  }
});

productRouter.get("/:pid", async (req, res) => {
  const products = await productManager.getProductById(req.params.pid);
  res.json(products);
});

productRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, status, code, stock } =
    req.body;
  await productManager.addProduct({
    title,
    description,
    price,
    thumbnail,
    status,
    code,
    stock,
  });
  res.send("Producto creado");
});

productRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const { title, description, price, thumbnail, status, code, stock } =
    req.body;

  const mensaje = await productManager.updateProduct(id, {
    title,
    description,
    price,
    thumbnail,
    status,
    code,
    stock,
  });

  res.send(mensaje);
});

productRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const mensaje = await productManager.deleteProduct(id);
  res.send(mensaje);
});

export default productRouter;

