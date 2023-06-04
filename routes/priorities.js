/**
 * Priorities routes
 */
const express = require('express');
const router = express.Router();
const { validateToken } = require('../utils/jwtTokenHandlers');

const {
  getPriorities,
  getPriority,
  createPriority,
  updatePriority,
  deletePriority
} = require('../controllers/priorities');

const {
  storePriorityValidator,
  requestByIdValidator
} = require('../validators/priorities');

/* GET users listing. */
router.get('/', validateToken, getPriorities);
router.get('/:id', validateToken, requestByIdValidator, getPriority);
router.post('/', validateToken, storePriorityValidator, createPriority);
router.put('/:id', validateToken, requestByIdValidator, storePriorityValidator, updatePriority);
router.delete('/:id', validateToken, requestByIdValidator, deletePriority);

module.exports = router;
