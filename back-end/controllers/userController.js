import User from '../models/User.js';
import AppError from '../utils/AppError.js';

// @desc Authentication
// @route POST /api/users/login
// @access Public
const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    });
  }

  throw new AppError('Invalid username or password.', 'AuthError', 401);
};

export { authUser };
