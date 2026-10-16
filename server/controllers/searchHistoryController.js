import * as searchHistoryService from '../services/searchHistoryService.js';

export const getSearchHistory = async (req, res, next) => {
  try {
    const history = await searchHistoryService.getSearchHistoryByUserId(req.user.id);
    res.json({ success: true, history });
  } catch (err) {
    next(err);
  }
};

export const addSearch = async (req, res, next) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }
    const item = await searchHistoryService.addSearchHistory(req.user.id, query);
    res.status(201).json({ success: true, item });
  } catch (err) {
    next(err);
  }
};

export const deleteSearch = async (req, res, next) => {
  try {
    const { id } = req.params;
    await searchHistoryService.deleteSearchHistoryItem(req.user.id, id);
    res.json({ success: true, message: 'Deleted history item' });
  } catch (err) {
    next(err);
  }
};

export const clearSearchHistory = async (req, res, next) => {
  try {
    await searchHistoryService.clearAllSearchHistory(req.user.id);
    res.json({ success: true, message: 'Cleared all search history' });
  } catch (err) {
    next(err);
  }
};
