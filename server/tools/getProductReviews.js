import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import pool from '../config/db.js';

// Tool: Get reviews for a specific product
const getProductReviews = new DynamicStructuredTool({
  name: 'getProductReviews',
  description: 'Get user reviews for a specific product. Use this to check what real users think about a product before recommending it. Returns review ratings and comments.',
  schema: z.object({
    productId: z.number().describe('The product ID to get reviews for'),
  }),
  func: async ({ productId }) => {
    const [reviews] = await pool.query(
      `SELECT r.rating, r.comment, u.name as reviewer
       FROM reviews r JOIN users u ON r.user_id = u.id
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC LIMIT 10`,
      [productId]
    );

    if (reviews.length === 0) return 'No reviews found for this product.';

    // Calculate average rating
    const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

    return JSON.stringify({ averageRating: avgRating, totalReviews: reviews.length, reviews });
  },
});

export default getProductReviews;
