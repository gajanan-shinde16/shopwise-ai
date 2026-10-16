import pool from '../config/db.js';

export const getWishlistByUserId = async (userId) => {
  const [rows] = await pool.query(
    `SELECT w.id as wishlist_id, w.created_at as saved_at,
            p.id, p.name, p.category, p.brand, p.price, p.rating, p.stock, p.image_url, p.description
     FROM wishlist w
     JOIN products p ON w.product_id = p.id
     WHERE w.user_id = ?
     ORDER BY w.created_at DESC`,
    [userId]
  );
  return rows;
};

export const addToWishlist = async (userId, productId) => {
  await pool.query(
    'INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)',
    [userId, productId]
  );
  return { success: true };
};

export const removeFromWishlist = async (userId, productId) => {
  await pool.query(
    'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );
  return { success: true };
};
