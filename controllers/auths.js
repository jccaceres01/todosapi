/**
 * Auth controller
 */

const { matchedData } = require('express-validator');
const { Users } = require('../models');
const { comparedhashedPassword } = require('../utils/passwordHandlers');
const { generateToken } = require('../utils/jwtTokenHandlers');

const loginUser = async (req, res) => {
  req = matchedData(req);
  const { email, password } = req;
  const user = await Users.findOne({ where: { email } });
  if (user) {
    const validPassword = await comparedhashedPassword(password, user.password);
    if (validPassword) {
      const userData = { id: user.id, name: user.name, email: user.email };
      const token = generateToken(userData);
      const data = {
        token,
        user: userData
      };
      return res.json(data);
    } else {
      return res.status(401).json('Unauthorized, password missmatch');
    }
  } else {
    return res.status(404).json('User not found');
  }
};

module.exports = { loginUser };
