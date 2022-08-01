import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../configs/db.configs.js';

import { CatalogsModel } from './catalogs.model.js';
import { OrdersModel } from './orders.model.js';

const sequelize = db.sequelize;

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'username already exists',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(),
    values: ['seller', 'buyer'],
    allowNull: false,
    validate: {
      isIn: {
        args: [['seller', 'buyer']],
        msg: 'Type Must be seller or buyer',
      },
    },
  },
});

Users.hasOne(CatalogsModel, {
  foreignKey: 'sellerId',
});

Users.hasMany(OrdersModel, {
  foreignKey: 'sellerId',
});

Users.hasMany(OrdersModel, {
  foreignKey: 'buyerId',
});

export const UsersModel = Users;
