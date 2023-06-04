/**
 * Tasks controller
 */
const { Tasks, Priorities, Categories } = require('../models');
const { matchedData } = require('express-validator');
const { log } = require('../utils/logsErrorsHandler');

/**
 * Get all Tasks
 */
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: Priorities },
        { model: Categories }
      ]
    });
    res.status(200).json(tasks);
  } catch (err) {
    log(err);
    return res.status(500).json('server errors');
  }
};

/**
 * Get task by id
 */
const getTask = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const task = await Tasks.findOne({
      where: { id, user_id: req.user.id },
      include: [
        { model: Priorities },
        { model: Categories }
      ]
    });
    if (!task) return res.status(404).json('task not found');
    return res.status(200).json(task);
  } catch (err) {
    log(err);
    return res.status(500).json('server errors');
  }
};

/**
 * create task
 */
const createTask = async (req, res) => {
  try {
    const data = matchedData(req);
    data.user_id = req.user.id;
    const task = await Tasks.create(data);
    res.status(201).json(task);
  } catch (err) {
    log(err);
    return res.status(500).json('server errors');
  }
};

/**
 * Update task
 */
const updateTask = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);
    const task = await Tasks.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!task) return res.status(404).json('task not found');
    const updatedTask = await task.update(data);
    return res.json(updatedTask);
  } catch (err) {
    log(err);
    return res.status(500).json('server errors');
  }
};

/**
 * Delete task
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const task = await Tasks.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!task) return res.status(404).json('task not found');
    await task.destroy();
    return res.json(true);
  } catch (err) {
    log(err);
    return res.status(500).json('server errors');
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
