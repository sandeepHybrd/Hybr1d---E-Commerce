import { authService } from '../services/auth.services.js';
import { CONSTANTS } from '../utils/constants.js';
import { ERRORS } from '../utils/errors.js';

const authPing = (req, res) => {
  res.status(200).send({ message: 'pong' });
};

const register = async (req, res) => {
  try {
    const { username, password, type } = req.body;
    if (!username || !password || !type) {
      const error = new Error(ERRORS.PASS_VALID_PAYLOAD);
      error.code = ERRORS.ERROR_CODES.BAD_REQUEST;
      throw error;
    }
    await authService.register({ username, password, type });
    return res
      .status(200)
      .send({ message: CONSTANTS.USER_REGISTRATION_SUCCESSFULL });
  } catch (err) {
    return res.status(err.code || 500).send({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const error = new Error(ERRORS.PASS_VALID_PAYLOAD);
      error.code = ERRORS.ERROR_CODES.BAD_REQUEST;
      throw error;
    }

    const { user, token } = await authService.login(username, password);
    return res.status(200).send({
      message: CONSTANTS.LOGIN_SUCCESS,
      token: token,
      username: user.username,
    });
  } catch (err) {
    return res.status(err.code || 500).send({ error: err.message });
  }
};

export const authController = {
  authPing,
  register,
  login,
};
