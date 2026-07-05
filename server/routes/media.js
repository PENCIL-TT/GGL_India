import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error('Unsupported file type'));
    }
    cb(null, true);
  },
});

export const mediaRouter = Router();

mediaRouter.post('/upload', requireAuth, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const url = `/uploads/${req.file.filename}`;

    try {
      const [result] = await pool.query(
        'INSERT INTO media (url, original_name) VALUES (?, ?)',
        [url, req.file.originalname]
      );
      res.json({ id: result.insertId, url });
    } catch (dbErr) {
      console.error('[media/upload] error:', dbErr);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

mediaRouter.get('/media', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, url, original_name, uploaded_at FROM media ORDER BY uploaded_at DESC LIMIT 200'
    );
    res.json(rows);
  } catch (err) {
    console.error('[media/list] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
