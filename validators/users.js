/**
 * Users validators
 */
const { check } = require('express-validator');
const { validationHandlers } = require('../utils/validationHandlers');

const storeUsersValidator = [
  check('name').exists().notEmpty().isLength({ max: 255 }),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ max: 255 }),
  (req, res, next) => validationHandlers(req, res, next)
];

const loginValidator = [
  check('email').exists().notEmpty(),
  check('password').exists().notEmpty(),
  (req, res, next) => validationHandlers(req, res, next)
];

const requestByIdValidator = [
  check('id').exists().notEmpty(),
  (req, res, next) => validationHandlers(req, res, next)
];

module.exports = {
  loginValidator,
  storeUsersValidator,
  requestByIdValidator
};
