import User from '../models/Admin.js';
import { hashPassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (email, password, deviceId) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('User already exists');

  const hashed = hashPassword(password);
  const user = await User.create({ email, password: hashed, deviceId });
  return user;
};

export const login = async (email, password, deviceId) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const { verifyPassword } = await import('../utils/hash.js');
  if (!verifyPassword(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  if (user.deviceId !== deviceId) {
    throw new Error('Device ID mismatch. Contact admin.');
  }

  if (user.role === 'customer' && !user.isDeviceVerified) {
    throw new Error('Device pending admin verification');
  }

  const token = generateToken({ id: user._id, role: user.role });
  return { 
    token, 
    user: { 
      id: user._id, 
      email: user.email, 
      role: user.role, 
      balance: user.balance 
    } 
  };
};