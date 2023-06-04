/**
 * Handler validation function
 */
const { validationResult } = require('express-validator');

const validationHandlers = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    return res.status(422).json(err.errors);
  }
};

module.exports = {
  validationHandlers
};
