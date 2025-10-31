import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  verifyDevice,
  getAllCustomers,
  getCustomerTransactions,
  getStats
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, adminOnly);

router.patch('/verify-device/:userId', verifyDevice);
router.get('/customers', getAllCustomers);
router.get('/customers/:userId/transactions', getCustomerTransactions);
router.get('/stats', getStats);

export default router;