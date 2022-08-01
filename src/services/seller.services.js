import { db } from '../configs/db.configs.js';
import { OrderLinesModel, OrdersModel } from '../models/index.js';

const sequelize = db.sequelize;
const getOrders = async (sellerId) => {
  try {
    return await sequelize.query(`
    SELECT Orders.id as orderId, Products.name as productName, Products.price as productPrice from Orders INNER JOIN OrderLines ON OrderLines.orderId = Orders.id INNER JOIN Products ON Products.id = OrderLines.productId WHERE sellerId = ${sellerId};
    `);
  } catch (err) {
    throw new Error(err);
  }
};

const getOrderLines = async (orders) => {
  try {
    return await OrdersModel.findAll({
      where: { id: orderId },
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const sellerServices = {
  getOrders,
  getOrderLines,
};
