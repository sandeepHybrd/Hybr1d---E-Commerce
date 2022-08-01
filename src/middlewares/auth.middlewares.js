import jwt from 'jsonwebtoken';
import { UsersModel } from '../models/index.js';

const verifyToken = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.API_SECRET);
      const user = await UsersModel.findOne({ where: { id: decoded.id } });
      if (!user) {
        throw new Error('Invalid Token');
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  } else {
    req.user = undefined;
    next();
  }
};

export const authMiddleware = {
  verifyToken,
};
