import { UsersModel } from '../models/users.model.js';
import { buyerServices } from '../services/index.js';
import { ProductServie } from '../services/products.service.js';
import { CONSTANTS } from '../utils/constants.js';
import { ERRORS } from '../utils/errors.js';

const getListOfSellers = async (req, res) => {
  try {
    const response = await buyerServices.getSellers();
    const sellers = response.map((seller) => ({
      id: seller.id,
      username: seller.username,
    }));
    return res.status(200).send({
      sellers: sellers,
    });
  } catch (err) {
    return res
      .status(err.code || ERRORS.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE)
      .send({
        error: err.message,
      });
  }
};

const getSellerCatalog = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const catalog = await buyerServices.getSellerCatalog(sellerId);
    if (catalog) {
      const products = await ProductServie.getProductsByCatalogId(catalog.id);
      return res
        .status(200)
        .send({ catalodId: catalog.id, products: products });
    }

    return res.status(200).send({ message: CONSTANTS.NO_CATALOG_EXISTS });
  } catch (err) {
    return res
      .status(err.code || ERRORS.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE)
      .send({ error: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const { sellerId } = req.params;
    const { id: buyerId } = req.user;
    const order = await buyerServices.createOrder(buyerId, sellerId);
    const orderLines = await buyerServices.createOrderLines(order.id, products);
    return res
      .status(200)
      .send({ message: 'order places successfully ', orders: orderLines });
  } catch (err) {
    return res
      .status(err.code || ERRORS.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE)
      .send({ error: err.message });
  }
};

export const buyersController = {
  getListOfSellers,
  getSellerCatalog,
  createOrder,
};
