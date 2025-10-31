import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getProfile } from '../controllers/customerController.js';

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);

export default router;