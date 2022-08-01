import { ProductsModel } from '../models/index.js';

const addProductsToCatalog = async (catalogId, products) => {
  try {
    const payload = products.map((product) => ({
      ...product,
      catalogId: catalogId,
    }));

    return await ProductsModel.bulkCreate(payload, { returning: true });
  } catch (err) {
    throw new Error(error.message);
  }
};

const getProductsByCatalogId = async (catalogId) => {
  try {
    const products = await ProductsModel.findAll({
      where: { catalogId: catalogId },
    });
    return products;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const ProductServie = {
  addProductsToCatalog,
  getProductsByCatalogId,
};
