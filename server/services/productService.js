import pool from '../config/db.js';

export const getProducts = async ({ category, brand, minPrice, maxPrice, sort, page = 1, limit = 12 }) => {
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category)  { query += ' AND category = ?'; params.push(category); }
  if (brand)     { query += ' AND brand = ?';    params.push(brand); }
  if (minPrice)  { query += ' AND price >= ?';   params.push(Number(minPrice)); }
  if (maxPrice)  { query += ' AND price <= ?';   params.push(Number(maxPrice)); }

  const sorts = { price_asc: 'price ASC', price_desc: 'price DESC', rating_desc: 'rating DESC', newest: 'created_at DESC' };
  query += ` ORDER BY ${sorts[sort] || 'created_at DESC'}`;

  const [countResult] = await pool.query(query.replace('SELECT *', 'SELECT COUNT(*) as total'), params);
  const total = countResult[0].total;

  page = Math.max(1, Number(page));
  limit = Math.min(50, Math.max(1, Number(limit)));
  params.push(limit, (page - 1) * limit);
  query += ' LIMIT ? OFFSET ?';

  const [products] = await pool.query(query, params);
  return { products, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

export const searchProducts = async (q) => {
  const term = `%${q}%`;
  const [rows] = await pool.query(
    'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR brand LIKE ? ORDER BY rating DESC',
    [term, term, term]
  );
  return rows;
};

export const getCategories = async () => {
  const [rows] = await pool.query('SELECT DISTINCT category FROM products ORDER BY category');
  return rows.map(r => r.category);
};

export const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0] || null;
};
