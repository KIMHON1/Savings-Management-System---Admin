
import User from '../models/User.js';
import Admin from '../models/Admin.js'; // Admins
import Transaction from '../models/Transaction.js'
import mongoose from 'mongoose';
//Verify device (only for users, not admins)
export const verifyDevice = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update the correct field
    user.isVerified = true;
    await user.save();

    res.json({ message: 'Device verified successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
;

//Get all customers (admins excluded)
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find().select('-password');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get transactions for a specific customer
export const getCustomerTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const transactions = await Transaction.find({
      user: new mongoose.Types.ObjectId(userId) 
    }).sort({ createdAt: -1 });

    console.log(`Found ${transactions.length} transactions for user ${userId}`);

    if (!transactions.length) {
      return res.json({ message: 'No transactions found', transactions: [] });
    }

    res.json({ transactions });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
};

//Dashboard stats (customer overview)
export const getStats = async (req, res) => {
  try {
    const [totalCustomers, verifiedCustomers, balanceResult, totalTransactions] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isDeviceVerified: true }),
      User.aggregate([{ $group: { _id: null, total: { $sum: '$balance' } } }]),
      Transaction.countDocuments()
    ]);

    res.json({
      totalCustomers,
      verifiedCustomers,
      totalBalance: balanceResult[0]?.total || 0,
      totalTransactions
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Admin-only section
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
