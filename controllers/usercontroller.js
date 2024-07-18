import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, recoveryEmail, DOB, mobileNumber, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword, recoveryEmail, DOB, mobileNumber, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.status = 'online';
    await user.save();
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAccount = async (req, res) => {
  const { email, mobileNumber, recoveryEmail, DOB, userName, lastName, firstName } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (email) user.email = email;
    if (mobileNumber) user.mobileNumber = mobileNumber;
    if (recoveryEmail) user.recoveryEmail = recoveryEmail;
    if (DOB) user.DOB = DOB;
    if (lastName) user.lastName = lastName;
    if (firstName) user.firstName = firstName;
    if (userName) user.userName = userName;

    await user.save();
    res.json({ message: 'Account updated successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'Account deleted successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProfileData = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password reset successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAccountsByRecoveryEmail = async (req, res) => {
  try {
    const users = await User.find({ recoveryEmail: req.params.recoveryEmail });
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
