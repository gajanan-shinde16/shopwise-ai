import * as wishlistService from '../services/wishlistService.js';

export const getWishlist = async (req, res, next) => {
  try {
    const items = await wishlistService.getWishlistByUserId(req.user.id);
    res.json({ success: true, wishlist: items });
  } catch (err) {
    next(err);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }
    await wishlistService.addToWishlist(req.user.id, productId);
    res.json({ success: true, message: 'Added to wishlist' });
  } catch (err) {
    next(err);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }
    await wishlistService.removeFromWishlist(req.user.id, productId);
    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (err) {
    next(err);
  }
};
