import {
  CatalogsModel,
  OrderLinesModel,
  OrdersModel,
  UsersModel,
} from '../models/index.js';
import { CONSTANTS } from '../utils/constants.js';
import { ERRORS } from '../utils/errors.js';

const getSellers = async () => {
  try {
    return await UsersModel.findAll({
      where: { type: CONSTANTS.SELLER },
      raw: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.code = ERRORS.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE;
    throw error;
  }
};

const getSellerCatalog = async (sellerId) => {
  try {
    const seller = await UsersModel.findOne({
      where: { id: sellerId, type: CONSTANTS.SELLER },
      raw: true,
    });
    if (!seller) {
      const error = new Error('seller not found');
      error.code = ERRORS.ERROR_CODES.BAD_REQUEST;
      throw error;
    }

    const catalog = await CatalogsModel.findOne({
      where: { sellerId: sellerId },
    });
    return catalog;
  } catch (err) {
    throw new Error(err);
  }
};

const createOrder = async (buyerId, sellerId) => {
  try {
    const seller = await UsersModel.findOne({
      where: { id: sellerId, type: CONSTANTS.SELLER },
      raw: true,
    });
    if (!seller) {
      const error = new Error('seller not found');
      error.code = ERRORS.ERROR_CODES.BAD_REQUEST;
      throw error;
    }

    const order = OrdersModel.build({
      sellerId: sellerId,
      buyerId: buyerId,
    });
    return await order.save();
  } catch (err) {
    throw new Error(err);
  }
};

const createOrderLines = async (orderId, products) => {
  try {
    const payload = products.map((productId) => ({
      orderId: orderId,
      productId: productId,
    }));
    return await OrderLinesModel.bulkCreate(payload, { returning: true });
  } catch (error) {
    throw new Error(err);
  }
};

export const buyerServices = {
  getSellers,
  getSellerCatalog,
  createOrder,
  createOrderLines,
};
