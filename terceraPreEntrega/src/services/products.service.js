import { productsMongo } from "../persistencia/DAOs/MongoDAOs/productsMongo.js";

class ProductsService {
  async findAllProducts() {
    try {
      const products = await productsMongo.findAll();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findOneProduct(id) {
    try {
      const product = await productsMongo.findOneById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createOneProduct(product) {
    try {
      const newProduct = await productsMongo.createOne(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateOneProduct(id, product) {
    try {
      const updatedProduct = await productsMongo.updateOne(id, product);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneProduct(id) {
    try {
      const deletedProduct = await productsMongo.deleteOne(id);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export const productsService = new ProductsService();
