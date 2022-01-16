import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import generateToken from '../utils/generateToken.js';

// @desc Authentication
// @route POST /api/users/login
// @access Public
const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  }

  throw new AppError('Invalid username or password.', 'AuthError', 401);
};

// @desc Get user Profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError('User not found', 'NotFound', 404);
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  });
};

// @desc Register a new user
// @route POST /api/users/register
// @access public
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new AppError(
      'This email is registered already, try another email.',
      'EmailAlreadyRegistered',
      400
    );
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  }

  throw new AppError('Invalid user data.', 'BadRequest', 400);
};

export { authUser, getUserProfile, registerUser };
