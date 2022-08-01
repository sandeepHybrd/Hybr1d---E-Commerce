import { Sequelize } from "sequelize"


const sequelize = new Sequelize('ECommerce', 'root', 'root', {
  dialect: "sqlite",
  storage: 'database.sqlite', // will be saving db as a file,
  logging: console.log
})

export const db = {
  sequelize
};

