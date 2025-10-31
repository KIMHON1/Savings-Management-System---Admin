import { Schema } from 'mongoose';
import { userDB } from '../utils/db.js'; 

const userSchema = new Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String },
  balance: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default userDB.model('User', userSchema);
