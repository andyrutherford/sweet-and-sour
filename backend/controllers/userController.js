import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

import generateToken from '../utils/genToken.js';

// @desc        Authenticate user and get token
// @route       POST /api/users/login
// @access      PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Authentication failed.');
  }
});

// @desc        Create a new user
// @route       POST /api/users
// @access      PUBLIC
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists.  Please log in.');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

// @desc        Get user profile
// @route       GET /api/users/profile
// @access      PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc        Update user profile
// @route       PUT /api/users/profile
// @access      PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      // Password will be encrypted before user.save() because of middleware in schema
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @desc        Get all user profiles
// @route       GET /api/users/
// @access      ADMIN
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc        Delete a user
// @route       DELETE /api/users/delete/:id
// @access      ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let userToDelete = await User.findById(id);
  if (!userToDelete) {
    res.status(404);
    throw new Error('User does not exist.');
  } else {
    await userToDelete.remove();
    res.json({ success: true, message: 'User deleted.' });
  }
});

// @desc        Get user by id
// @route       GET /api/users/:id
// @access      ADMIN
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let user = await User.findById(id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User does not exist.');
  } else {
    res.json(user);
  }
});

// @desc        Update user
// @route       PUT /api/users/:id
// @access      ADMIN
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    // An admin is not able to change their admin status
    if (
      req.params.id.toString() === req.user._id.toString() &&
      req.body.hasOwnProperty('isAdmin') &&
      req.body.isAdmin !== user.isAdmin
    ) {
      res.status(401);
      throw new Error('You are not authorized to change your Admin status.');
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.hasOwnProperty('isAdmin')
      ? req.body.isAdmin
      : user.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

export {
  authUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
