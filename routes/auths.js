/**
 * Auths routes
 */
const express = require('express');
const router = express.Router();

const { loginUser } = require('../controllers/auths');
const { validateToken } = require('../utils/jwtTokenHandlers');
const {
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const { loginValidator, storeUsersValidator } = require('../validators/users');

router.post('/register', storeUsersValidator, createUser);
router.post('/login', loginValidator, loginUser);
router.put('/users', validateToken, storeUsersValidator, updateUser);
router.delete('/users', validateToken, loginValidator, deleteUser);

module.exports = router;
