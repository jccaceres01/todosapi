/**
 * Handlers json web token
 */
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  return token;
};

const validateToken = (req, res, next) => {
  const token = req.header('_token') || req.query._token;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return res.status(401).json('invalid token');
      req.user = payload;
      return next();
    });
  } else {
    return res.status(401).json('No token provided');
  }
};

module.exports = {
  generateToken,
  validateToken
};
