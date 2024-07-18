import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  recoveryEmail: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['User', 'Company_HR'],
    required: true
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

// Method to generate auth token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Ensure username is first name + last name by default
userSchema.pre('save', function(next) {
  if (!this.userName) {
    this.userName = `${this.firstName}${this.lastName}`;
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
