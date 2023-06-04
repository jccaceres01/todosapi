/**
 * Priorities validators
 */
const { check } = require('express-validator');
const { validationHandlers } = require('../utils/validationHandlers');

const storeCategoryValidator = [
  check('name').exists().notEmpty(),
  check('description'),
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
  storeCategoryValidator,
  requestByIdValidator
};
