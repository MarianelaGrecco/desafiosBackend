import { productsService } from "../services/products.service.js";
import logger from "../utils/logger.js";

export const findAllProducts = async (req, res) => {
  try {
    const products = await productsService.findAllProducts();
    logger.info("Products found:", products);
    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    logger.error("Error finding products:", error);
    res.status(500).json({ error });
  }
};

export const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsService.findOneProduct(id);
    if (product) {
      logger.info("Product found:", product);
      res.status(200).json({ message: "Product found", product });
    } else {
      logger.warn("Product not found");
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    logger.error("Error finding product:", error);
    res.status(500).json({ error });
  }
};

export const createOneProduct = async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Data missing" });
  }
  try {
    const user = await usersModel.findById(req.user.id);
    if (user.role === 'premium') {
      // El usuario es "premium", permitir crear el producto
      const newProductData = { ...req.body, owner: req.user.email }; // Añadir el propietario
      const newProduct = await productsService.createOneProduct(newProductData);
      logger.info("Product created:", newProduct);
      res.status(201).json({ message: "Product created", product: newProduct });
    } else {
      // El usuario no tiene permisos para crear productos
      logger.warn("User not authorized to create products");
      res.status(403).json({ message: "User not authorized to create products" });
    }
  } catch (error) {
    logger.error("Error creating product:", error);
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
    const product = await productsService.findOneProduct(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Verificar si el usuario es admin
    if (req.user.isAdmin) {
      const updatedProduct = await productsService.updateOneProduct(id, req.body);
      logger.info("Product updated:", updatedProduct);
      return res.status(200).json({ message: "Product updated", product: updatedProduct });
    }

    // Verificar si el usuario es premium y es el dueño del producto
    if (req.user.role === "premium" && product.owner === req.user.email) {
      const updatedProduct = await productsService.updateOneProduct(id, req.body);
      logger.info("Product updated:", updatedProduct);
      return res.status(200).json({ message: "Product updated", product: updatedProduct });
    }

    return res.status(403).json({ message: "Unauthorized to update this product" });
  } catch (error) {
    logger.error("Error updating product:", error);
    res.status(500).json({ error });
  }
};

export const deleteOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsService.findOneProduct(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Verificar si el usuario es admin
    if (req.user.isAdmin) {
      const deletedProduct = await productsService.deleteOneProduct(id);
      logger.info("Product deleted:", deletedProduct);
      return res.status(200).json({ message: "Product deleted", product: deletedProduct });
    }

    // Verificar si el usuario es premium y es el dueño del producto
    if (req.user.role === "premium" && product.owner === req.user.email) {
      const deletedProduct = await productsService.deleteOneProduct(id);
      logger.info("Product deleted:", deletedProduct);
      return res.status(200).json({ message: "Product deleted", product: deletedProduct });
    }

    return res.status(403).json({ message: "Unauthorized to delete this product" });
  } catch (error) {
    logger.error("Error deleting product:", error);
    res.status(500).json({ error });
  }
};
