import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const servicesRouter = Router();

servicesRouter.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services ORDER BY sort_order ASC, title ASC'
    );
    res.json(rows.map(formatRow));
  } catch (err) {
    console.error('[services/list] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

servicesRouter.get('/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE slug = ? LIMIT 1', [req.params.slug]);
    if (!rows[0]) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(formatRow(rows[0]));
  } catch (err) {
    console.error('[services/get] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

servicesRouter.post('/', requireAuth, async (req, res) => {
  const { slug, title, subtitle, heroImage, iconName, handlingSteps, whyChooseUs, sortOrder } = req.body || {};
  if (!slug || !title || !/^[a-z0-9-]+$/.test(slug)) {
    return res.status(400).json({ error: 'slug (lowercase-with-dashes) and title are required' });
  }

  try {
    await pool.query(
      `INSERT INTO services (slug, title, subtitle, hero_image, icon_name, handling_steps, why_choose_us, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        title,
        subtitle || '',
        heroImage || '',
        iconName || '',
        JSON.stringify(handlingSteps || []),
        JSON.stringify(whyChooseUs || []),
        sortOrder ?? 99,
      ]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'A service with this slug already exists' });
    }
    console.error('[services/create] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

servicesRouter.put('/:slug', requireAuth, async (req, res) => {
  const { title, subtitle, heroImage, iconName, handlingSteps, whyChooseUs, sortOrder } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }

  try {
    const [result] = await pool.query(
      `UPDATE services
       SET title = ?, subtitle = ?, hero_image = ?, icon_name = ?, handling_steps = ?, why_choose_us = ?, sort_order = ?
       WHERE slug = ?`,
      [
        title,
        subtitle || '',
        heroImage || '',
        iconName || '',
        JSON.stringify(handlingSteps || []),
        JSON.stringify(whyChooseUs || []),
        sortOrder ?? 99,
        req.params.slug,
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[services/update] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

servicesRouter.delete('/:slug', requireAuth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM services WHERE slug = ?', [req.params.slug]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[services/delete] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function formatRow(row) {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    heroImage: row.hero_image,
    iconName: row.icon_name,
    handlingSteps: JSON.parse(row.handling_steps || '[]'),
    whyChooseUs: JSON.parse(row.why_choose_us || '[]'),
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  };
}
