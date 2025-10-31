import { Schema } from 'mongoose';
import { adminDB } from '../utils/db.js';

const adminSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

export default adminDB.model('Admin', adminSchema);
