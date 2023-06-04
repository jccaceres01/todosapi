/**
 * Users controllers
 */
const { Users } = require('../models');
const { matchedData } = require('express-validator');
const { hashPassword } = require('../utils/passwordHandlers');
const { log } = require('../utils/logsErrorsHandler');

/**
 * Get user by id
 */
const getUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const user = await Users.findByPk(id);
    if (!user) return res.status(404).json('user not found');
    return res.status(200).json(user);
  } catch (err) {
    log(err);
    return res.status(500).json('Server error');
  }
};

/**
 * Create user
 */
const createUser = async (req, res) => {
  try {
    req = matchedData(req);
    const found = await Users.findOne({
      where: { email: req.email }
    });
    if (!found) {
      req.password = await hashPassword(req.password);
      const newUser = await Users.create(req);
      return res.status(201).json(newUser);
    } else {
      return res.status(422).json('User with this email exists');
    }
  } catch (err) {
    log(err);
    return res.status(500).json('Server error');
  }
};

/**
 * Update user
 */
const updateUser = async (req, res) => {
  try {
    const data = matchedData(req);
    data.password = await hashPassword(data.password);
    const user = await Users.findOne({
      where: { email: req.user.email }
    });
    if (user) {
      const updatedUser = await user.update(data);
      return res.json(updatedUser);
    } else {
      return res.status(404).json('user not found');
    }
  } catch (err) {
    console.log(err);
    log(err);
    return res.status(500).json('Server error');
  }
};

/**
 * Delete user
 */
const deleteUser = async (req, res) => {
  try {
    await Users.destroy({
      where: { id: req.user.id }
    });
    return res.json(true);
  } catch (err) {
    log(err);
    return res.status(500).json('Server error');
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
};
