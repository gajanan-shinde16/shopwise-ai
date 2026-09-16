import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import pool from '../config/db.js';

// Tool: Search products by keyword in name, description, or brand
const searchProducts = new DynamicStructuredTool({
  name: 'searchProducts',
  description: 'Search for products by keyword. Use this when the user mentions a product name, type, or brand. Returns matching products with their details.',
  schema: z.object({
    query: z.string().describe('The search keyword, e.g. "laptop", "Sony headphones", "iPhone"'),
  }),
  func: async ({ query }) => {
    const term = `%${query}%`;
    const [rows] = await pool.query(
      `SELECT id, name, category, brand, price, rating, stock,
              JSON_UNQUOTE(specifications) as specifications
       FROM products
       WHERE name LIKE ? OR description LIKE ? OR brand LIKE ?
       ORDER BY rating DESC LIMIT 10`,
      [term, term, term]
    );
    if (rows.length === 0) return 'No products found matching the search query.';
    return JSON.stringify(rows);
  },
});

export default searchProducts;
