import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import pool from '../config/db.js';

// Tool: Compare multiple products side by side
const compareProducts = new DynamicStructuredTool({
  name: 'compareProducts',
  description: 'Compare two or more products side by side. Use this when the user wants to compare specific products or when you need to evaluate the best option among shortlisted products. Provide product IDs.',
  schema: z.object({
    productIds: z.array(z.number()).describe('Array of product IDs to compare, e.g. [1, 3, 7]'),
  }),
  func: async ({ productIds }) => {
    if (productIds.length < 2) return 'Please provide at least 2 product IDs to compare.';

    const placeholders = productIds.map(() => '?').join(',');
    const [rows] = await pool.query(
      `SELECT id, name, category, brand, price, rating, stock,
              JSON_UNQUOTE(specifications) as specifications, description
       FROM products WHERE id IN (${placeholders})`,
      productIds
    );

    if (rows.length < 2) return 'Could not find enough products to compare.';
    return JSON.stringify(rows);
  },
});

export default compareProducts;
