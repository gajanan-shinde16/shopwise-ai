import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import pool from '../config/db.js';

// Tool: Check stock availability for a product
const checkStock = new DynamicStructuredTool({
  name: 'checkStock',
  description: 'Check if a specific product is currently in stock. Use this before finalizing a recommendation to ensure the product is available for purchase.',
  schema: z.object({
    productId: z.number().describe('The product ID to check stock for'),
  }),
  func: async ({ productId }) => {
    const [rows] = await pool.query(
      'SELECT id, name, stock FROM products WHERE id = ?',
      [productId]
    );

    if (rows.length === 0) return 'Product not found.';

    const product = rows[0];
    return JSON.stringify({
      productId: product.id,
      name: product.name,
      stock: product.stock,
      available: product.stock > 0,
    });
  },
});

export default checkStock;
