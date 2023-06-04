/**
 * Categories routes
 */
const express = require('express');
const router = express.Router();

const { validateToken } = require('../utils/jwtTokenHandlers');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');

const {
  storeCategoryValidator,
  requestByIdValidator
} = require('../validators/categories');

/* GET users listing. */
router.get('/', validateToken, getCategories);
router.get('/:id', validateToken, requestByIdValidator, getCategory);
router.post('/', validateToken, storeCategoryValidator, createCategory);
router.put('/:id', validateToken, requestByIdValidator, storeCategoryValidator, updateCategory);
router.delete('/:id', validateToken, requestByIdValidator, deleteCategory);

module.exports = router;
