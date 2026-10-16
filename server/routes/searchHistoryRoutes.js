import { Router } from 'express';
import * as searchHistoryController from '../controllers/searchHistoryController.js';
import auth from '../middleware/auth.js';

const router = Router();

// Protected routes
router.use(auth);

router.get('/', searchHistoryController.getSearchHistory);
router.post('/', searchHistoryController.addSearch);
router.delete('/:id', searchHistoryController.deleteSearch);
router.delete('/', searchHistoryController.clearSearchHistory);

export default router;
