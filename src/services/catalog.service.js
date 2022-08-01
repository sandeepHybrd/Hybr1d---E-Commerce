import { CatalogsModel } from '../models/index.js';

const getCatalogId = async (sellerId) => {
  try {
    const catalog = await CatalogsModel.findOne({
      where: { sellerId: sellerId },
      raw: true,
    });
    return catalog;
  } catch (error) {
    throw new Error(err.message);
  }
};

const createCatalog = async (sellerId) => {
  try {
    const catalog = CatalogsModel.build({
      sellerId: sellerId,
    });

    return await catalog.save();
  } catch (error) {
    throw new Error(err.message);
  }
};

export const CatalogService = {
  getCatalogId,
  createCatalog,
};
