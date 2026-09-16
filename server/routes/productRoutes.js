import { Router } from 'express';
import * as productController from '../controllers/productController.js';

const router = Router();

router.get('/search', productController.searchProducts);
router.get('/categories', productController.getCategories);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

export default router;
