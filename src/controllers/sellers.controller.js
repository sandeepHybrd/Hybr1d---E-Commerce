import { CatalogService, sellerServices } from '../services/index.js';
import { ProductServie } from '../services/products.service.js';
import { CONSTANTS } from '../utils/constants.js';
import { ERRORS } from '../utils/errors.js';

const createCatalog = async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || products.length <= 0) {
      const error = new Error(ERRORS.PASS_VALID_PAYLOAD);
      error.code = ERRORS.ERROR_CODES.BAD_REQUEST;
      throw error;
    }
    const sellerId = req.user.id;
    let catalog = await CatalogService.getCatalogId(sellerId);
    if (!catalog) {
      catalog = await CatalogService.createCatalog(sellerId);
    }
    const data = await ProductServie.addProductsToCatalog(catalog.id, products);
    return res
      .status(200)
      .send({ message: CONSTANTS.PRODUCTS_ADDED, data: data });
  } catch (err) {
    return res
      .status(err.code || ERRORS.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE)
      .send({ error: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { id: sellerId } = req.user;
    const orders = await sellerServices.getOrders(sellerId);
    if (orders && orders[0] && orders[0].length > 0) {
      const newOrders = orders[0].reduce((initial, order) => {
        const productObj = {
          productName: order.productName,
          productPrice: order.productPrice,
        };
        if (!initial[order.orderId]) {
          initial[order.orderId] = [productObj];
        } else {
          initial[order.orderId].push(productObj);
        }

        return initial;
      }, {});
      return res.status(200).send({ orders: newOrders });
    }

    return res.status(200).send({ message: 'No Orders' });
  } catch (err) {
    res
      .status(err.code || ERRORS.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE)
      .send({ error: err.message });
  }
};

export const sellersController = {
  createCatalog,
  getOrders,
};
