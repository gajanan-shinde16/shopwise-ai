import pool from '../config/db.js';

export const getReviewsByProductId = async (productId) => {
  const [rows] = await pool.query(
    `SELECT r.id, r.rating, r.comment, r.created_at, u.name as user_name
     FROM reviews r JOIN users u ON r.user_id = u.id
     WHERE r.product_id = ? ORDER BY r.created_at DESC`,
    [productId]
  );
  return rows;
};

export const createReview = async (userId, productId, rating, comment) => {
  const [result] = await pool.query(
    'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
    [userId, productId, rating, comment]
  );
  return { id: result.insertId, user_id: userId, product_id: productId, rating, comment };
};
