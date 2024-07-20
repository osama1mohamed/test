import dotenv from 'dotenv'
dotenv.config()

// Environment variables
const { PORT, MONGODB_URI, JWT_SECRET } = process.env

export default {
  PORT: PORT || 3000,
  MONGODB_URI,
  JWT_SECRET
}
