import { Router } from 'express';
import { pool } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

export const officesRouter = Router();

officesRouter.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM offices ORDER BY sort_order ASC, country_name ASC, city_name ASC');
    res.json(rows.map(formatRow));
  } catch (err) {
    console.error('[offices/list] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

officesRouter.post('/', requireAuth, async (req, res) => {
  const office = req.body || {};
  if (!office.countryName || !office.cityName || !office.address) {
    return res.status(400).json({ error: 'countryName, cityName, and address are required' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO offices (country_code, country_name, country_lat, country_lng, city_name, lat, lng, address, contacts, email, map_embed_url, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      toRow(office)
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('[offices/create] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

officesRouter.put('/:id', requireAuth, async (req, res) => {
  const office = req.body || {};
  if (!office.countryName || !office.cityName || !office.address) {
    return res.status(400).json({ error: 'countryName, cityName, and address are required' });
  }

  try {
    const [result] = await pool.query(
      `UPDATE offices SET country_code=?, country_name=?, country_lat=?, country_lng=?, city_name=?, lat=?, lng=?,
       address=?, contacts=?, email=?, map_embed_url=?, sort_order=? WHERE id = ?`,
      [...toRow(office), req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Office not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[offices/update] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

officesRouter.delete('/:id', requireAuth, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM offices WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Office not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[offices/delete] error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function toRow(o) {
  return [
    o.countryCode || '',
    o.countryName,
    o.countryLat ?? null,
    o.countryLng ?? null,
    o.cityName,
    o.lat ?? null,
    o.lng ?? null,
    o.address,
    JSON.stringify(o.contacts || []),
    o.email || null,
    o.mapEmbedUrl || null,
    o.sortOrder ?? 99,
  ];
}

function formatRow(row) {
  return {
    id: row.id,
    countryCode: row.country_code,
    countryName: row.country_name,
    countryLat: row.country_lat,
    countryLng: row.country_lng,
    cityName: row.city_name,
    lat: row.lat,
    lng: row.lng,
    address: row.address,
    contacts: JSON.parse(row.contacts || '[]'),
    email: row.email,
    mapEmbedUrl: row.map_embed_url,
    sortOrder: row.sort_order,
  };
}
