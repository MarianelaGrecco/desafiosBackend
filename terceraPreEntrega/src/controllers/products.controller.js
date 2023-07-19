import { productsService } from "../services/products.service.js";

export const findAllProducts = async (req, res) => {
  try {
    const products = await productsService.findAllProducts();
    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsService.findOneProduct(id);
    if (product) {
      res.status(200).json({ message: "Product found", product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createOneProduct = async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Data missing" });
  }
  try {
    const newProduct = await productsService.createOneProduct(req.body);
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateOneProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Data missing" });
  }
  try {
    const updatedProduct = await productsService.updateOneProduct(id, req.body);
    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productsService.deleteOneProduct(id);
    res.status(200).json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};
