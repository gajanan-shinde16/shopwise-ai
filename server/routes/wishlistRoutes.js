import { Router } from 'express';
import * as wishlistController from '../controllers/wishlistController.js';
import auth from '../middleware/auth.js';

const router = Router();

// All wishlist routes require authentication
router.use(auth);

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

export default router;
