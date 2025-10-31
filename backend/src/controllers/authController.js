import { adminRegisterSchema, adminLoginSchema } from '../dtos/authDto.js';
import Admin from '../models/Admin.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res) => {
  try {
    const { error } = adminRegisterSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

    const admin = await Admin.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { error } = adminLoginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
    if (hashedPassword !== admin.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
