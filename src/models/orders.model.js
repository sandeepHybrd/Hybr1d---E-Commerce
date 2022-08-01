import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../configs/db.configs.js';
import { UsersModel } from './users.model.js';
import { ProductsModel } from './products.model.js';
import { OrderLinesModel } from './orderlines.model.js';

const sequelize = db.sequelize;

const Orders = sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

Orders.hasMany(OrderLinesModel, {
  foreignKey: 'orderId',
});

export const OrdersModel = Orders;
