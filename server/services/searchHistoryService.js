import pool from '../config/db.js';

export const getSearchHistoryByUserId = async (userId) => {
  const [rows] = await pool.query(
    'SELECT id, query, created_at FROM search_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    [userId]
  );
  return rows;
};

export const addSearchHistory = async (userId, query) => {
  if (!query || !query.trim()) return;
  const [result] = await pool.query(
    'INSERT INTO search_history (user_id, query) VALUES (?, ?)',
    [userId, query.trim()]
  );
  return { id: result.insertId, user_id: userId, query: query.trim() };
};

export const deleteSearchHistoryItem = async (userId, id) => {
  await pool.query(
    'DELETE FROM search_history WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return { success: true };
};

export const clearAllSearchHistory = async (userId) => {
  await pool.query(
    'DELETE FROM search_history WHERE user_id = ?',
    [userId]
  );
  return { success: true };
};
