/**
 * Tasks routes
 */
const express = require('express');
const router = express.Router();

const { validateToken } = require('../utils/jwtTokenHandlers');

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks');

const {
  storeTasksValidator,
  requestByIdValidator
} = require('../validators/tasks');

router.get('/', validateToken, getTasks);
router.get('/:id', validateToken, requestByIdValidator, getTask);
router.post('/', validateToken, storeTasksValidator, createTask);
router.put('/:id', validateToken, requestByIdValidator, storeTasksValidator, updateTask);
router.delete('/:id', validateToken, requestByIdValidator, deleteTask);

module.exports = router;
