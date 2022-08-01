import * as dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
import { db } from './src/configs/db.configs.js';

process.on('uncaughtException', (err) => {
  console.log('Unhandled Exception!  Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server running on port: ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
