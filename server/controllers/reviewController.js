import * as reviewService from '../services/reviewService.js';

export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviewsByProductId(req.params.id);
    res.json({ success: true, reviews });
  } catch (err) { next(err); }
};

export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;
    if (!productId || !rating) return res.status(400).json({ success: false, message: 'productId and rating are required' });
    if (rating < 1 || rating > 5) return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });

    const review = await reviewService.createReview(req.user.id, productId, rating, comment);
    res.status(201).json({ success: true, review });
  } catch (err) { next(err); }
};
