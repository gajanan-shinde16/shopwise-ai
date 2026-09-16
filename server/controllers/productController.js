import * as productService from '../services/productService.js';

export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.getProducts(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const searchProducts = async (req, res, next) => {
  try {
    if (!req.query.q) return res.status(400).json({ success: false, message: 'Search query (q) is required' });
    const products = await productService.searchProducts(req.query.q);
    res.json({ success: true, products });
  } catch (err) { next(err); }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await productService.getCategories();
    res.json({ success: true, categories });
  } catch (err) { next(err); }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) { next(err); }
};
