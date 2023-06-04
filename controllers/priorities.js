/**
 * Priorities controller
 */
const { Priorities } = require('../models');
const { matchedData } = require('express-validator');
const { log } = require('../utils/logsErrorsHandler');

/**
 * Get all Priorities
 */
const getPriorities = async (req, res) => {
  try {
    const prior = await Priorities.findAll({
      where: {
        user_id: req.user.id
      }
    });
    res.status(200).json(prior);
  } catch (err) {
    log(err);
    return res.status(500).json('server errors');
  }
};

/**
 * Get priority by id
 */
const getPriority = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const prior = await Priorities.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!prior) return res.status(404).json('priority not found');
    return res.status(200).json(prior);
  } catch (err) {
    log(err);
    return res.status(500).json('server errors');
  }
};

/**
 * create priority
 */
const createPriority = async (req, res) => {
  try {
    const data = matchedData(req);
    data.user_id = req.user.id;
    const prior = await Priorities.create(data);
    res.status(201).json(prior);
  } catch (err) {
    console.log(err);
    log(err);
    return res.status(500).json('server errors');
  }
};

/**
 * Create priority
 */
const updatePriority = async (req, res) => {
  try {
    req = matchedData(req);
    const { id, ...data } = req;
    const prio = await Priorities.findByPk(id);
    const updated = await prio.update(data);
    if (!updated) return res.status(404).json('priority not found');
    return res.status(200).json(updated);
  } catch (err) {
    log(err);
    return res.status(500).json('server errors');
  }
};

/**
 * Delete priority
 */
const deletePriority = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const prior = await Priorities.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!prior) return res.status(404).json('priority not found');
    await prior.destroy();
    return res.status(200).json(true);
  } catch (err) {
    console.log(err);
    log(err);
    return res.status(500).json('server errors');
  }
};

module.exports = {
  getPriorities,
  getPriority,
  createPriority,
  updatePriority,
  deletePriority
};
