// models/Transaction.js
import { Schema } from 'mongoose';
import { userDB } from '../utils/db.js';  

const transactionSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true 
  },
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  amount: { type: Number, required: true },
  confirmed: { type: Boolean, default: false },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default userDB.model('Transaction', transactionSchema);