import crypto from 'crypto';

export const hashPassword = (password) => {
  return crypto.createHash('sha512').update(password).digest('hex');
};

export const verifyPassword = (password, hash) => {
  return crypto.createHash('sha512').update(password).digest('hex') === hash;
};