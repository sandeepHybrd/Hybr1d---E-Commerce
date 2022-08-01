import { UsersModel } from '../models/index.js';
import { ERRORS } from '../utils/errors.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async ({ username, password, type }) => {
  try {
    const user = UsersModel.build({
      username: username,
      password: bcrypt.hashSync(password, 8),
      type: type,
    });

    await user.save();
  } catch (err) {
    const error = new Error(err.message);
    error.code = ERRORS.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE;
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const user = await UsersModel.findOne({
      where: { username: username },
      raw: true,
    });
    if (!user) {
      throw new Error(ERRORS.USER_NOT_FOUND);
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new Error(ERRORS.INVALID_PASSWORD);
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: '2 days',
      }
    );

    return { user, token };
  } catch (err) {
    const error = new Error(err.message);
    error.code = ERRORS.ERROR_CODES.INTERNAL_SERVER_ERROR_CODE;
    throw error;
  }
};

export const authService = {
  register,
  login,
};
