import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../configs/db.configs.js';
import { OrderLinesModel } from './orderlines.model.js';
import { OrdersModel } from './orders.model.js';

const sequelize = db.sequelize;

const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Products.hasMany(OrderLinesModel, {
  foreignKey: 'productId',
});

export const ProductsModel = Products;
