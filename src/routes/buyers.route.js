import express from 'express';
import { buyersController } from '../controllers/index.js';

const router = express.Router();

router.route('/list-of-sellers').get(buyersController.getListOfSellers);
router
  .route('/seller-catalog/:sellerId')
  .get(buyersController.getSellerCatalog);
router.route('/create-order/:sellerId').post(buyersController.createOrder);

export const buyersRoutes = router;
