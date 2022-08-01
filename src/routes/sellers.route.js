import express from 'express';

import { sellersController } from '../controllers/index.js';
const router = express.Router();

router.route('/create-catalog').post(sellersController.createCatalog);
router.route('/orders').get(sellersController.getOrders);


export const sellersRoutes = router;