import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import pool from '../config/db.js';

// Tool: Filter products by category, price range, brand, and minimum rating
const filterProducts = new DynamicStructuredTool({
  name: 'filterProducts',
  description: 'Filter products by specific criteria like category, price range, brand, or minimum rating. Use this after understanding the user requirements to narrow down options.',
  schema: z.object({
    category: z.string().optional().describe('Product category: "laptop", "smartphone", or "headphone"'),
    minPrice: z.number().optional().describe('Minimum price in INR'),
    maxPrice: z.number().optional().describe('Maximum price in INR'),
    brand: z.string().optional().describe('Brand name, e.g. "HP", "Samsung", "Sony"'),
    minRating: z.number().optional().describe('Minimum rating (0-5)'),
  }),
  func: async ({ category, minPrice, maxPrice, brand, minRating }) => {
    let query = `SELECT id, name, category, brand, price, rating, stock,
                        JSON_UNQUOTE(specifications) as specifications
                 FROM products WHERE 1=1`;
    const params = [];

    if (category)  { query += ' AND category = ?';  params.push(category); }
    if (brand)     { query += ' AND brand = ?';     params.push(brand); }
    if (minPrice)  { query += ' AND price >= ?';    params.push(minPrice); }
    if (maxPrice)  { query += ' AND price <= ?';    params.push(maxPrice); }
    if (minRating) { query += ' AND rating >= ?';   params.push(minRating); }

    query += ' ORDER BY rating DESC LIMIT 10';

    const [rows] = await pool.query(query, params);
    if (rows.length === 0) return 'No products found matching the given filters.';
    return JSON.stringify(rows);
  },
});

export default filterProducts;
