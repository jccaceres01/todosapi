/**
 * Categories controller
 */
const { Categories } = require('../models');
const { matchedData } = require('express-validator');
const { log } = require('../utils/logsErrorsHandler');

/**
 * Get all Categories
 */
const getCategories = async (req, res) => {
  try {
    const cats = await Categories.findAll({
      where: { user_id: req.user.id }
    });
    res.status(200).json(cats);
  } catch (err) {
    log(err);
    res.status(500).json('server errors');
  }
};

/**
 * Get category by id
 */
const getCategory = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const cat = await Categories.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!cat) return res.status(404).json('category not found');
    res.status(200).json(cat);
  } catch (err) {
    log(err);
    res.status(500).json('server errors');
  }
};

/**
 * create category
 */
const createCategory = async (req, res) => {
  try {
    const data = matchedData(req);
    data.user_id = req.user.id;
    const cat = await Categories.create(data);
    res.status(201).json(cat);
  } catch (err) {
    log(err);
    res.status(500).json('server errors');
  }
};

/**
 * Update category
 */
const updateCategory = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);
    const foundCat = await Categories.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!foundCat) return res.status(404).json('cat not found');
    const updatedCat = await foundCat.update(data);
    return res.json(updatedCat);
  } catch (err) {
    log(err);
    res.status(500).json('server errors');
  }
};

/**
 * Delete category
 */
const deleteCategory = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const cat = await Categories.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!cat) return res.status(404).json('category not found');
    await cat.destroy();
    return res.json(true);
  } catch (err) {
    log(err);
    res.status(500).json('server errors');
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
