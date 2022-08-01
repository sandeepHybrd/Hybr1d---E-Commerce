import { ERRORS } from '../utils/errors.js';
import { CONSTANTS } from '../utils/constants.js';

const isBuyer = (req, res, next) => {
  if (!req.user) {
    res.status(500).send({ error: ERRORS.INVALID_TOKEN });
  }

  if (req.user.type != CONSTANTS.BUYER) {
    res.status(500).send({ error: ERRORS.UNATHORIZED });
  }

  next();
};

export const buyerMiddleware = {
  isBuyer,
};
