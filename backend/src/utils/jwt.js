import jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRE = '1d' } = process.env;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};