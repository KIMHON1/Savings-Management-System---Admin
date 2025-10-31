import { verifyToken } from '../utils/jwt.js';
import User from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'User not found' });

    if (req.user.role === 'customer' && !req.user.isDeviceVerified) {
      return res.status(403).json({ message: 'Device not verified by admin' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};