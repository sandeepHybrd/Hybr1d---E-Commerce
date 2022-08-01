import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import { authRoutes, buyersRoutes, sellersRoutes } from './routes/index.js';
import {
  authMiddleware,
  sellerMiddleware,
  buyerMiddleware,
} from './middlewares/index.js';

const app = express();

app.use(helmet()); // set HTTP security headers

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(xss()); // Data Sanitization against cross-site scripting

// routes
app.use('/api/auth', authRoutes);
app.use(
  '/api/seller',
  authMiddleware.verifyToken,
  sellerMiddleware.isSeller,
  sellersRoutes
);
app.use(
  '/api/buyer',
  authMiddleware.verifyToken,
  buyerMiddleware.isBuyer,
  buyersRoutes
);

app.all('*', (req, res) => {
  res
    .status(404)
    .send({ error: `Can't find ${req.originalUrl} on this server` });
});

export default app;
