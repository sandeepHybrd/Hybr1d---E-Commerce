import { DataTypes, Sequelize } from 'sequelize';
import { db } from '../configs/db.configs.js';
import { ProductsModel } from './products.model.js';

const sequelize = db.sequelize;

const Catalogs = sequelize.define(
  'Catalogs',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  }
)

Catalogs.hasMany(ProductsModel, {
  foreignKey: 'catalogId'
});

export const CatalogsModel = Catalogs;


