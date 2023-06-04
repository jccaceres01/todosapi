/**
 * Tasks validators
 */
const { check } = require('express-validator');
const { validationHandlers } = require('../utils/validationHandlers');

const storeTasksValidator = [
  check('title').exists().notEmpty().isLength({ max: 255 }),
  check('description').isLength({ max: 255 }),
  check('completed_date'),
  check('end_date'),
  check('priority_id'),
  check('category_id'),
  (req, res, next) => {
    validationHandlers(req, res, next);
  }
];

const requestByIdValidator = [
  check('id').exists().notEmpty(),
  (req, res, next) => {
    validationHandlers(req, res, next);
  }
];

module.exports = {
  storeTasksValidator,
  requestByIdValidator
};
