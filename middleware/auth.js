import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/usermodel.js';

dotenv.config();

const auth = async (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Retrieve the token from the Authorization header
    const token = authHeader.replace('Bearer ', '');

    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user with the ID from the token payload and ensure the token exists in the user's tokens array
    const user = await User.findOne({ _id: decoded.id });

    // If user is not found, throw an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the token and user to the request object for further use in the route handler
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    // If an error occurs, respond with a 401 status and an error message
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

export default auth;
