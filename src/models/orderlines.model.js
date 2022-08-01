import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../configs/db.configs.js';

const sequelize = db.sequelize;

const OrderLines = sequelize.define('OrderLines', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

export const OrderLinesModel = OrderLines;
