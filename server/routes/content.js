import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const contentRouter = Router();

const PAGE_KEY_PATTERN = /^[a-z0-9-]{1,100}$/;

function checkPageKey(req, res, next) {
  if (!PAGE_KEY_PATTERN.test(req.params.pageKey)) {
    return res.status(404).json({ error: 'Unknown content page' });
  }
  next();
}

contentRouter.get('/:pageKey', checkPageKey, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT data FROM site_content WHERE content_key = ? LIMIT 1',
      [req.params.pageKey]
    );

    if (!rows[0]) {
      return res.json(null);
    }

    res.json(JSON.parse(rows[0].data));
  } catch (err) {
    console.error('[content/get] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

contentRouter.put('/:pageKey', checkPageKey, requireAuth, async (req, res) => {
  const content = req.body;

  if (content === undefined || content === null) {
    return res.status(400).json({ error: 'Request body must be JSON content' });
  }

  try {
    await pool.query(
      `INSERT INTO site_content (content_key, data) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE data = VALUES(data)`,
      [req.params.pageKey, JSON.stringify(content)]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('[content/put] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
