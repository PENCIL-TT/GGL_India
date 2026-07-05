import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

export const adminRouter = Router();

adminRouter.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check for required environment variables before proceeding
  const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
  const missingEnv = requiredEnv.filter(name => !process.env[name]);
  if (missingEnv.length > 0) {
    console.error(`[admin/login] Missing environment variables: ${missingEnv.join(', ')}`);
    return res.status(500).json({ 
      error: `Server configuration error: Missing environment variables (${missingEnv.join(', ')}). Please set them up in your hosting environment (e.g., Vercel dashboard).` 
    });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, email, password_hash FROM admin_users WHERE email = ? LIMIT 1',
      [email]
    );
    const admin = rows[0];

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { sub: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('[admin/login] error:', err);
    res.status(500).json({ 
      error: `Database connection error: ${err.message}. Please verify your DB_HOST, DB_USER, DB_PASSWORD, DB_NAME settings and verify if remote access is allowed for your database.` 
    });
  }
});
