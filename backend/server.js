import 'express-async-error';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter } from './src/middlewares/rateLimiter.js';
import errorHandler from './src/middlewares/errorHandler.js';

import authRoutes from './src/routes/auth.js';
import adminRoutes from './src/routes/admin.js';
import customerRoutes from './src/routes/customer.js';

import './src/utils/db.js'; // ensures DB connections are established

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(rateLimiter);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
