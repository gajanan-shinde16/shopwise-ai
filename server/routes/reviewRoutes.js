import { Router } from 'express';
import * as reviewController from '../controllers/reviewController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/product/:id', reviewController.getProductReviews);
router.post('/', auth, reviewController.createReview);

export default router;
